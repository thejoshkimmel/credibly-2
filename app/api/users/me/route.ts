import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rows: [userProfile] } = await query(
      `SELECT id, first_name, last_name, user_type, company_name, created_at
       FROM users
       WHERE id = $1`,
      [user.id]
    );

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get user's average rating
    const { rows: [{ avg_rating }] } = await query(
      `SELECT COALESCE(AVG(overall_rating), 0) as avg_rating
       FROM ratings
       WHERE rated_user_id = $1`,
      [user.id]
    );

    // Get total number of ratings
    const { rows: [{ total_ratings }] } = await query(
      `SELECT COUNT(*) as total_ratings
       FROM ratings
       WHERE rated_user_id = $1`,
      [user.id]
    );

    return NextResponse.json({
      ...userProfile,
      averageRating: parseFloat(avg_rating),
      totalRatings: parseInt(total_ratings)
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
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
      [firstName, lastName, companyName, user.id]
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 