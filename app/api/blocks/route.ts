import { NextRequest, NextResponse } from "next/server";
import Block from "@/models/Block";
import { connectToDatabase } from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import { z } from "zod";

const blockSchema = z.object({
  blockedId: z.string().min(1),
  reason: z.string().optional(),
});

// GET /api/blocks - Get list of blocked users
export async function GET(req) {
  await connectToDatabase();
  let userId;
  try {
    userId = getUserFromRequest(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blocks = await Block.find({ blockerId: userId })
      .populate("blockedId", "displayName userId profilePicture");
    return NextResponse.json({ blocks });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blocks" }, { status: 500 });
  }
}

// POST /api/blocks - Block a user
export async function POST(req) {
  await connectToDatabase();
  let userId;
  try {
    userId = getUserFromRequest(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = blockSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { blockedId, reason } = parsed.data;

    // Create the block
    const block = await Block.create({
      blockerId: userId,
      blockedId,
      reason,
    });

    return NextResponse.json({ success: true, block });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "User is already blocked" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to block user" }, { status: 500 });
  }
}

// DELETE /api/blocks - Unblock a user
export async function DELETE(req) {
  await connectToDatabase();
  let userId;
  try {
    userId = getUserFromRequest(req);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const blockedId = searchParams.get("blockedId");
    
    if (!blockedId) {
      return NextResponse.json({ error: "Missing blockedId" }, { status: 400 });
    }

    await Block.deleteOne({ blockerId: userId, blockedId });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to unblock user" }, { status: 500 });
  }
} 