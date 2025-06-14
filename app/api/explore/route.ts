import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = (page - 1) * limit;
    const search = searchParams.get("search") || "";

    const { rows: users } = await query(
      `SELECT id, first_name, last_name, user_type, company_name, created_at
       FROM users
       WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR company_name ILIKE $1)
       AND id != $2
       ORDER BY created_at DESC
       LIMIT $3 OFFSET $4`,
      [`%${search}%`, user.id, limit, offset]
    );

    const { rows: [{ count }] } = await query(
      `SELECT COUNT(*) 
       FROM users 
       WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR company_name ILIKE $1)
       AND id != $2`,
      [`%${search}%`, user.id]
    );

    return NextResponse.json({
      users,
      total: parseInt(count),
      page,
      limit
    });
  } catch (error) {
    console.error("Error exploring users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 