import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import UserProfile from "@/models/UserProfile";
import Rating from "@/models/Rating";
import { connectToDatabase } from "@/lib/mongodb";
import redis from '@/lib/redis';
import { rateLimit } from '@/lib/rateLimit';
import { query } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rows: [targetUser] } = await query(
      `SELECT id, first_name, last_name, user_type, company_name, created_at
       FROM users
       WHERE id = $1`,
      [params.id]
    );

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's average rating
    const { rows: [{ avg_rating }] } = await query(
      `SELECT COALESCE(AVG(overall_rating), 0) as avg_rating
       FROM ratings
       WHERE rated_user_id = $1`,
      [params.id]
    );

    // Get total number of ratings
    const { rows: [{ total_ratings }] } = await query(
      `SELECT COUNT(*) as total_ratings
       FROM ratings
       WHERE rated_user_id = $1`,
      [params.id]
    );

    return NextResponse.json({
      ...targetUser,
      averageRating: parseFloat(avg_rating),
      totalRatings: parseInt(total_ratings)
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only allow users to update their own profile
    if (user.id !== params.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { firstName, lastName, companyName } = await req.json();

    const { rows: [updatedUser] } = await query(
      `UPDATE users 
       SET first_name = COALESCE($1, first_name),
           last_name = COALESCE($2, last_name),
           company_name = COALESCE($3, company_name),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING id, first_name, last_name, user_type, company_name, created_at`,
      [firstName, lastName, companyName, params.id]
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 