import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rows: [rating] } = await query(
      `SELECT r.*, 
              u1.first_name as rater_first_name, u1.last_name as rater_last_name,
              u2.first_name as rated_first_name, u2.last_name as rated_last_name
       FROM ratings r
       JOIN users u1 ON r.rater_user_id = u1.id
       JOIN users u2 ON r.rated_user_id = u2.id
       WHERE r.id = $1 AND (r.rater_user_id = $2 OR r.rated_user_id = $2)`,
      [params.id, user.id]
    );

    if (!rating) {
      return NextResponse.json({ error: "Rating not found" }, { status: 404 });
    }

    return NextResponse.json(rating);
  } catch (error) {
    console.error("Error fetching rating:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { professionalism, timeliness, communication, overall, comment } = await req.json();

    // Check if user is the rater
    const { rows: [existingRating] } = await query(
      "SELECT id FROM ratings WHERE id = $1 AND rater_user_id = $2",
      [params.id, user.id]
    );

    if (!existingRating) {
      return NextResponse.json({ error: "Rating not found or unauthorized" }, { status: 404 });
    }

    // Update rating
    const { rows: [updatedRating] } = await query(
      `UPDATE ratings 
       SET professionalism_rating = COALESCE($1, professionalism_rating),
           timeliness_rating = COALESCE($2, timeliness_rating),
           communication_rating = COALESCE($3, communication_rating),
           overall_rating = COALESCE($4, overall_rating),
           comment = COALESCE($5, comment),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [professionalism, timeliness, communication, overall, comment, params.id]
    );

    return NextResponse.json(updatedRating);
  } catch (error) {
    console.error("Error updating rating:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is the rater
    const { rows: [existingRating] } = await query(
      "SELECT id FROM ratings WHERE id = $1 AND rater_user_id = $2",
      [params.id, user.id]
    );

    if (!existingRating) {
      return NextResponse.json({ error: "Rating not found or unauthorized" }, { status: 404 });
    }

    // Delete rating
    const { rows: [deletedRating] } = await query(
      "DELETE FROM ratings WHERE id = $1 RETURNING *",
      [params.id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting rating:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 