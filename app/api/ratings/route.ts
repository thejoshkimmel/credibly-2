import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import UserProfile from "@/models/UserProfile";
import Rating from "@/models/Rating";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import { z } from "zod";
import redis from '@/lib/redis';
import { rateLimit } from '@/lib/rateLimit';

// Simple in-memory rate limiter (per IP, 10 requests per minute)
const rateLimitMap = new Map();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 1000;

const ratingSchema = z.object({
  raterUserId: z.string().min(1),
  ratedUserId: z.string().min(1),
  criteria: z.object({
    professionalism: z.number().min(1).max(5),
    timeliness: z.number().min(1).max(5),
    communication: z.number().min(1).max(5),
    overall: z.number().min(1).max(5),
  }),
  comment: z.string().max(300).optional(),
});

export async function POST(req) {
  await connectToDatabase();
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const allowed = await rateLimit(ip, 'ratings', 20, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  // Auth
  let userId;
  try {
    userId = getUserFromRequest(req);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Validation
  const body = await req.json();
  const parsed = ratingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { raterUserId, ratedUserId, criteria, comment } = parsed.data;
  if (userId !== raterUserId) {
    return NextResponse.json({ error: "User mismatch" }, { status: 401 });
  }
  // Save the rating
  const rating = await Rating.create({ raterUserId, ratedUserId, criteria, comment });
  // Invalidate cache for ratings and user profile
  await redis.del(`ratings_${ratedUserId}`);
  await redis.del(`user_profile_${ratedUserId}`);
  // Recalculate averages and update UserProfile
  const ratings = await Rating.find({ ratedUserId });
  const keys = ["professionalism", "timeliness", "communication", "overall"];
  const averages = {};
  for (const key of keys) {
    const values = ratings.map(r => r.criteria[key]);
    averages[key] = values.length ? (values.reduce((a, b) => a + b, 0) / values.length) : 0;
  }
  const overallAvg = ratings.length ? (ratings.map(r => r.criteria.overall).reduce((a, b) => a + b, 0) / ratings.length) : 0;
  await UserProfile.findByIdAndUpdate(ratedUserId, {
    averageRating: overallAvg,
    ratingsCount: ratings.length,
  });
  return NextResponse.json({ success: true, rating });
}

export async function GET(req) {
  await connectToDatabase();
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const allowed = await rateLimit(ip, 'ratings', 20, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  const { searchParams } = new URL(req.url);
  const ratedUserId = searchParams.get("ratedUserId");
  if (!ratedUserId) return NextResponse.json({ error: "Missing ratedUserId" }, { status: 400 });
  const cacheKey = `ratings_${ratedUserId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }
  const ratings = await Rating.find({ ratedUserId });
  await redis.set(cacheKey, JSON.stringify(ratings), 'EX', 120);
  return NextResponse.json(ratings);
} 