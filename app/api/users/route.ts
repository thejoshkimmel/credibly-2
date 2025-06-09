import { NextRequest, NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import { connectToDatabase } from "@/lib/mongodb";
import redis from '@/lib/redis';
import { rateLimit } from '@/lib/rateLimit';

export async function GET(req) {
  await connectToDatabase();
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const allowed = await rateLimit(ip, 'users', 20, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const skip = (page - 1) * limit;
  const filter = q
    ? {
        $or: [
          { displayName: { $regex: q, $options: "i" } },
          { location: { $regex: q, $options: "i" } },
        ],
      }
    : {};
  const users = await UserProfile.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await UserProfile.countDocuments(filter);
  return NextResponse.json({ users, total, page, limit });
} 