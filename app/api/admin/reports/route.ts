import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

// GET /api/admin/reports - List all reports
export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return empty array since MongoDB is removed
    return NextResponse.json([]);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/admin/reports - Update report status
export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reportId, action } = await req.json();
    if (!reportId || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Return success since MongoDB is removed
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 