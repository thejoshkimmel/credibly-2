import { NextRequest, NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import redis from '@/lib/redis';

export async function POST(req) {
  await connectToDatabase();
  let userId;
  try {
    userId = getUserFromRequest(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { displayName, bio, location, profilePicture } = await req.json();
  const update = { displayName, bio, location, profilePicture };
  const user = await UserProfile.findOneAndUpdate(
    { userId },
    { $set: update },
    { new: true, upsert: true }
  );
  // Invalidate cache
  await redis.del(`user_profile_${user._id}`);
  return NextResponse.json({ success: true, user });
} 