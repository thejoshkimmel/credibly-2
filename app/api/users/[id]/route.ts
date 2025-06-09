import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import UserProfile from "@/models/UserProfile";
import Rating from "@/models/Rating";
import { connectToDatabase } from "@/lib/mongodb";
import redis from '@/lib/redis';
import { rateLimit } from '@/lib/rateLimit';

export async function GET(req, { params }) {
  await connectToDatabase();
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const allowed = await rateLimit(ip, 'user_profile', 20, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  const { id } = params;
  const cacheKey = `user_profile_${id}`;
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }
  // Find user profile
  const user = await UserProfile.findById(id).lean();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  // Find all ratings for this user
  const ratings = await Rating.find({ ratedUserId: id }).lean();
  // Calculate averages
  const criteria = ["professionalism", "timeliness", "communication", "overall"];
  const averages = {};
  for (const key of criteria) {
    const values = ratings.map(r => r.criteria[key]);
    averages[key] = values.length ? (values.reduce((a, b) => a + b, 0) / values.length) : null;
  }
  const response = {
    ...user,
    ratings,
    averages,
  };
  // Cache for 5 minutes
  await redis.set(cacheKey, JSON.stringify(response), 'EX', 300);
  return NextResponse.json(response);
} 