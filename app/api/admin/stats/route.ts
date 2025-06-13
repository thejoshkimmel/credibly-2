import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return mock stats since MongoDB is removed
    return NextResponse.json({
      totalUsers: 0,
      totalConnections: 0,
      totalRatings: 0,
      totalReports: 0,
      activeUsers: 0,
      newUsersToday: 0,
      newConnectionsToday: 0,
      newRatingsToday: 0,
      newReportsToday: 0
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 