import { NextRequest, NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import Report from "@/models/Report";
import Rating from "@/models/Rating";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";

// Helper to check if user is admin
async function checkAdmin(req) {
  const userId = getUserFromRequest(req);
  const user = await UserProfile.findOne({ userId });
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function GET(req) {
  await connectToDatabase();
  try {
    await checkAdmin(req);

    // Get date ranges
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // User statistics
    const [totalUsers, verifiedUsers, suspendedUsers, newUsers] = await Promise.all([
      UserProfile.countDocuments(),
      UserProfile.countDocuments({ verified: true }),
      UserProfile.countDocuments({ status: "suspended" }),
      UserProfile.countDocuments({ createdAt: { $gte: today } }),
    ]);

    // Report statistics
    const [totalReports, pendingReports, resolvedReports, dismissedReports] = await Promise.all([
      Report.countDocuments(),
      Report.countDocuments({ status: "pending" }),
      Report.countDocuments({ status: "resolved" }),
      Report.countDocuments({ status: "dismissed" }),
    ]);

    // Rating statistics
    const ratings = await Rating.find();
    const totalRatings = ratings.length;
    const averageRating = totalRatings > 0
      ? ratings.reduce((sum, r) => sum + r.criteria.overall, 0) / totalRatings
      : 0;

    // Rating distribution
    const distribution = {};
    for (let i = 1; i <= 5; i++) {
      distribution[i] = ratings.filter(r => r.criteria.overall === i).length;
    }

    // Activity statistics
    const [last24hActivity, last7dActivity, last30dActivity] = await Promise.all([
      Rating.countDocuments({ createdAt: { $gte: last24h } }),
      Rating.countDocuments({ createdAt: { $gte: last7d } }),
      Rating.countDocuments({ createdAt: { $gte: last30d } }),
    ]);

    return NextResponse.json({
      users: {
        total: totalUsers,
        verified: verifiedUsers,
        suspended: suspendedUsers,
        newToday: newUsers,
      },
      reports: {
        total: totalReports,
        pending: pendingReports,
        resolved: resolvedReports,
        dismissed: dismissedReports,
      },
      ratings: {
        total: totalRatings,
        average: averageRating,
        distribution,
      },
      activity: {
        last24h: last24hActivity,
        last7d: last7dActivity,
        last30d: last30dActivity,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
} 