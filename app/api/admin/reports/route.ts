import { NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import redis from '@/lib/redis';
import { rateLimit } from '@/lib/rateLimit';

// Helper to check if user is admin
async function checkAdmin(req) {
  const userId = getUserFromRequest(req);
  const user = await UserProfile.findOne({ userId });
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

// GET /api/admin/reports - List all reports
export async function GET(req) {
  await connectToDatabase();
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const allowed = await rateLimit(ip, 'admin_reports', 20, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  await checkAdmin(req);
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const skip = (page - 1) * limit;
  const reports = await Report.find()
    .populate("reporterId", "displayName userId")
    .populate("reportedUserId", "displayName userId")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await Report.countDocuments();
  return NextResponse.json({ reports, total, page, limit });
}

// POST /api/admin/reports - Update report status
export async function POST(req) {
  await connectToDatabase();
  try {
    const admin = await checkAdmin(req);
    const { reportId, action, notes } = await req.json();
    
    const report = await Report.findById(reportId);
    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    switch (action) {
      case "review":
        report.status = "reviewing";
        break;
      case "resolve":
        report.status = "resolved";
        report.resolvedAt = new Date();
        report.resolvedBy = admin._id;
        break;
      case "dismiss":
        report.status = "dismissed";
        report.resolvedAt = new Date();
        report.resolvedBy = admin._id;
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    if (notes) {
      report.adminNotes = notes;
    }

    await report.save();
    // Invalidate cache for reported user
    await redis.del(`user_profile_${report.reportedUserId}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
} 