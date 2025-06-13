import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rows: [connection] } = await query(
      `SELECT c.*, 
              u1.first_name as user_a_first_name, u1.last_name as user_a_last_name,
              u2.first_name as user_b_first_name, u2.last_name as user_b_last_name
       FROM connections c
       JOIN users u1 ON c.user_a_id = u1.id
       JOIN users u2 ON c.user_b_id = u2.id
       WHERE c.id = $1 AND (c.user_a_id = $2 OR c.user_b_id = $2)`,
      [params.id, user.id]
    );

    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    return NextResponse.json(connection);
  } catch (error) {
    console.error("Error fetching connection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({ error: "Missing status" }, { status: 400 });
    }

    const { rows: [updatedConnection] } = await query(
      `UPDATE connections 
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND (user_a_id = $3 OR user_b_id = $3)
       RETURNING *`,
      [status, params.id, user.id]
    );

    if (!updatedConnection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    return NextResponse.json(updatedConnection);
  } catch (error) {
    console.error("Error updating connection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { rows: [deletedConnection] } = await query(
      `DELETE FROM connections 
       WHERE id = $1 AND (user_a_id = $2 OR user_b_id = $2)
       RETURNING *`,
      [params.id, user.id]
    );

    if (!deletedConnection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting connection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 