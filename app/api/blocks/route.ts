import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { z } from "zod";

const blockSchema = z.object({
  blockedId: z.string().min(1),
  reason: z.string().optional(),
});

// GET /api/blocks - Get list of blocked users
export async function GET(req) {
  try {
    const blocks = await Block.find({ blockerId: req.userId })
      .populate("blockedId", "displayName userId profilePicture");
    return NextResponse.json({ blocks });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blocks" }, { status: 500 });
  }
}

// POST /api/blocks - Block a user
export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = blockSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { blockedId, reason } = parsed.data;

    // Create the block
    const block = await Block.create({
      blockerId: req.userId,
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
  try {
    const { searchParams } = new URL(req.url);
    const blockedId = searchParams.get("blockedId");
    
    if (!blockedId) {
      return NextResponse.json({ error: "Missing blockedId" }, { status: 400 });
    }

    await Block.deleteOne({ blockerId: req.userId, blockedId });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to unblock user" }, { status: 500 });
  }
} 