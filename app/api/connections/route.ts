import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

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

    const { rows: connections } = await query(
      `SELECT c.*, 
              u1.first_name as user_a_first_name, u1.last_name as user_a_last_name,
              u2.first_name as user_b_first_name, u2.last_name as user_b_last_name
       FROM connections c
       JOIN users u1 ON c.user_a_id = u1.id
       JOIN users u2 ON c.user_b_id = u2.id
       WHERE c.user_a_id = $1 OR c.user_b_id = $1
       ORDER BY c.created_at DESC
       LIMIT $2 OFFSET $3`,
      [user.id, limit, offset]
    );

    const { rows: [{ count }] } = await query(
      "SELECT COUNT(*) FROM connections WHERE user_a_id = $1 OR user_b_id = $1",
      [user.id]
    );

    return NextResponse.json({
      connections,
      total: parseInt(count),
      page,
      limit
    });
  } catch (error) {
    console.error("Error fetching connections:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId } = await req.json();
    if (!targetUserId) {
      return NextResponse.json({ error: "Missing target user ID" }, { status: 400 });
    }

    // Check if connection already exists
    const { rows: existingConnections } = await query(
      "SELECT id FROM connections WHERE (user_a_id = $1 AND user_b_id = $2) OR (user_a_id = $2 AND user_b_id = $1)",
      [user.id, targetUserId]
    );

    if (existingConnections.length > 0) {
      return NextResponse.json({ error: "Connection already exists" }, { status: 400 });
    }

    // Create new connection
    const { rows: [newConnection] } = await query(
      `INSERT INTO connections (user_a_id, user_b_id)
       VALUES ($1, $2)
       RETURNING *`,
      [user.id, targetUserId]
    );

    return NextResponse.json(newConnection);
  } catch (error) {
    console.error("Error creating connection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 