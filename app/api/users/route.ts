import { NextRequest, NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import { connectToDatabase } from "@/lib/mongodb";
import redis from '@/lib/redis';
import { rateLimit } from '@/lib/rateLimit';
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
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
    const search = searchParams.get("search") || "";

    const { rows: users } = await query(
      `SELECT id, first_name, last_name, user_type, company_name, created_at
       FROM users
       WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR company_name ILIKE $1)
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [`%${search}%`, limit, offset]
    );

    const { rows: [{ count }] } = await query(
      `SELECT COUNT(*) 
       FROM users 
       WHERE (first_name ILIKE $1 OR last_name ILIKE $1 OR company_name ILIKE $1)`,
      [`%${search}%`]
    );

    return NextResponse.json({
      users,
      total: parseInt(count),
      page,
      limit
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { firstName, lastName, userType, companyName } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create new user
    const { rows: [newUser] } = await query(
      `INSERT INTO users (first_name, last_name, user_type, company_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, first_name, last_name, user_type, company_name, created_at`,
      [firstName, lastName, userType, companyName]
    );

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 