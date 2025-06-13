import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { z } from "zod";
import redis from '@/lib/redis';

const reportSchema = z.object({
  reportedUserId: z.string().min(1),
  type: z.enum(["inappropriate_content", "harassment", "spam", "fake_profile", "other"]),
  description: z.string().min(10).max(1000),
});

export async function POST(req) {
  let reporterId;
  try {
    reporterId = getUserFromRequest(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = reportSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { reportedUserId, type, description } = parsed.data;

    // Create the report
    // Invalidate cache for reported user
    await redis.del(`user_profile_${reportedUserId}`);
    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("Failed to create report:", error);
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
  }
} 