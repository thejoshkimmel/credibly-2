import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import redis from '@/lib/redis';
import { rateLimit } from '@/lib/rateLimit';

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const allowed = await rateLimit(ip, 'explore', 20, 60);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  const db = await connectToDatabase();
  const cacheKey = 'explore_trending';
  const cached = await redis.get(cacheKey);
  if (cached) {
    return NextResponse.json(JSON.parse(cached));
  }
  // Aggregate ratings by rateeId
  const trending = await db.collection("ratings").aggregate([
    {
      $group: {
        _id: "$rateeId",
        count: { $sum: 1 },
        avgScore: { $avg: "$stars" },
      },
    },
    { $sort: { count: -1, avgScore: -1 } },
    { $limit: 10 },
  ]).toArray();
  await redis.set(cacheKey, JSON.stringify(trending), 'EX', 120);
  return NextResponse.json(trending);
} 