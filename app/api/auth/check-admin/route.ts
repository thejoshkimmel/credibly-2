import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [userProfile] = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id));

    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ isAdmin: userProfile.userType === "admin" });
  } catch (error) {
    console.error("Error checking admin status:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 