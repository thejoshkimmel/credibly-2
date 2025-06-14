import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, ratings, connections, reports } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

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

    // Get total users
    const [{ totalUsers }] = await db
      .select({
        totalUsers: sql<number>`COUNT(*)`,
      })
      .from(users);

    // Get total ratings
    const [{ totalRatings }] = await db
      .select({
        totalRatings: sql<number>`COUNT(*)`,
      })
      .from(ratings);

    // Get total connections
    const [{ totalConnections }] = await db
      .select({
        totalConnections: sql<number>`COUNT(*)`,
      })
      .from(connections);

    // Get total reports
    const [{ totalReports }] = await db
      .select({
        totalReports: sql<number>`COUNT(*)`,
      })
      .from(reports);

    // Get average rating
    const [{ avgRating }] = await db
      .select({
        avgRating: sql<number>`COALESCE(AVG(${ratings.overallRating}), 0)`,
      })
      .from(ratings);

    return NextResponse.json({
      totalUsers,
      totalRatings,
      totalConnections,
      totalReports,
      averageRating: avgRating,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 