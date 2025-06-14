import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { users, ratings } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

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

    // Get user's average rating
    const [{ avgRating }] = await db
      .select({
        avgRating: sql<number>`COALESCE(AVG(${ratings.overallRating}), 0)`,
      })
      .from(ratings)
      .where(eq(ratings.ratedUserId, user.id));

    // Get total number of ratings
    const [{ totalRatings }] = await db
      .select({
        totalRatings: sql<number>`COUNT(*)`,
      })
      .from(ratings)
      .where(eq(ratings.ratedUserId, user.id));

    return NextResponse.json({
      ...userProfile,
      averageRating: avgRating,
      totalRatings: totalRatings,
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

    const [updatedUser] = await db
      .update(users)
      .set({
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        companyName: companyName ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
      .returning();

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 