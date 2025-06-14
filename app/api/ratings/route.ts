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

    const { ratedUserId, professionalism, timeliness, communication, overall, comment } = await req.json();

    // Validate required fields
    if (!ratedUserId || !professionalism || !timeliness || !communication || !overall) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user has already rated this person
    const { rows: existingRatings } = await query(
      "SELECT id FROM ratings WHERE rater_user_id = $1 AND rated_user_id = $2",
      [user.id, ratedUserId]
    );

    if (existingRatings.length > 0) {
      return NextResponse.json({ error: "You have already rated this user" }, { status: 400 });
    }

    // Create new rating
    const { rows: [newRating] } = await query(
      `INSERT INTO ratings (
        rater_user_id, rated_user_id, professionalism_rating,
        timeliness_rating, communication_rating, overall_rating, comment
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [user.id, ratedUserId, professionalism, timeliness, communication, overall, comment]
    );

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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = (page - 1) * limit;

    const { rows: ratings } = await query(
      `SELECT r.*, 
              u1.first_name as rater_first_name, u1.last_name as rater_last_name,
              u2.first_name as rated_first_name, u2.last_name as rated_last_name
       FROM ratings r
       JOIN users u1 ON r.rater_user_id = u1.id
       JOIN users u2 ON r.rated_user_id = u2.id
       WHERE r.rater_user_id = $1 OR r.rated_user_id = $1
       ORDER BY r.created_at DESC
       LIMIT $2 OFFSET $3`,
      [user.id, limit, offset]
    );

    const { rows: [{ count }] } = await query(
      "SELECT COUNT(*) FROM ratings WHERE rater_user_id = $1 OR rated_user_id = $1",
      [user.id]
    );

    return NextResponse.json({
      ratings,
      total: parseInt(count),
      page,
      limit
    });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 