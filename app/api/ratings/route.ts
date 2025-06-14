import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import UserProfile from "@/models/UserProfile";
import Rating from "@/models/Rating";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import { z } from "zod";
import redis from '@/lib/redis';
import { rateLimit } from '@/lib/rateLimit';
import { query } from "@/lib/db";
import { db } from "@/lib/db";
import { ratings } from "@/db/schema";
import { eq } from "drizzle-orm";

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
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ratedUserId, overallRating, communicationRating, reliabilityRating, professionalismRating, comment } = await req.json();

    const [newRating] = await db
      .insert(ratings)
      .values({
        ratedUserId,
        raterUserId: user.id,
        overallRating,
        communicationRating,
        reliabilityRating,
        professionalismRating,
        comment,
      })
      .returning();

    return NextResponse.json(newRating);
  } catch (error) {
    console.error("Error creating rating:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRatings = await db
      .select()
      .from(ratings)
      .where(eq(ratings.ratedUserId, user.id));

    return NextResponse.json(userRatings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 