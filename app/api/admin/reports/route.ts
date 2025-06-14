import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, reports } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET /api/admin/reports - List all reports
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

    const allReports = await db
      .select()
      .from(reports);

    return NextResponse.json(allReports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/reports - Update report status
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

    const { reportId, status, adminNotes } = await req.json();

    const [updatedReport] = await db
      .update(reports)
      .set({
        status,
        adminNotes,
        resolvedAt: new Date(),
        resolvedBy: user.id,
      })
      .where(eq(reports.id, reportId))
      .returning();

    return NextResponse.json(updatedReport);
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 