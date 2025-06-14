import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/admin/users - List all users
export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const [adminUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id));

    if (!adminUser || adminUser.userType !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const allUsers = await db
      .select()
      .from(users);

    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/users - Update user status
export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const [adminUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id));

    if (!adminUser || adminUser.userType !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { email, password, firstName, lastName, userType, companyName } = await req.json();

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        password, // Note: Make sure to hash the password before inserting
        firstName,
        lastName,
        userType,
        companyName,
        verified: true,
      })
      .returning();

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 