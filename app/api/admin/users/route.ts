import { NextRequest, NextResponse } from "next/server";
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

// GET /api/admin/users - List all users
export async function GET(req) {
  await connectToDatabase();
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const allowed = await rateLimit(ip, 'admin_users', 20, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  await checkAdmin(req);
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const skip = (page - 1) * limit;
  const users = await UserProfile.find({}, "-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await UserProfile.countDocuments();
  return NextResponse.json({ users, total, page, limit });
}

// POST /api/admin/users - Update user status
export async function POST(req) {
  await connectToDatabase();
  try {
    await checkAdmin(req);
    const { userId, action, reason, duration } = await req.json();
    
    const user = await UserProfile.findOne({ userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    switch (action) {
      case "suspend":
        user.status = "suspended";
        user.suspensionReason = reason;
        user.suspensionExpires = duration ? new Date(Date.now() + duration * 1000) : null;
        break;
      case "unsuspend":
        user.status = "active";
        user.suspensionReason = null;
        user.suspensionExpires = null;
        break;
      case "delete":
        await UserProfile.deleteOne({ userId });
        await redis.del(`user_profile_${user._id}`);
        return NextResponse.json({ success: true });
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await user.save();
    await redis.del(`user_profile_${user._id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
} 