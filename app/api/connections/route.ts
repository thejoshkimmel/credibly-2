import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { connections } from "@/db/schema";
import { eq, or, and } from "drizzle-orm";

export async function GET(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userConnections = await db
      .select()
      .from(connections)
      .where(
        or(
          eq(connections.userAId, user.id),
          eq(connections.userBId, user.id)
        )
      );

    return NextResponse.json(userConnections);
  } catch (error) {
    console.error("Error fetching connections:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId } = await req.json();
    if (!targetUserId) {
      return NextResponse.json({ error: "Missing target user ID" }, { status: 400 });
    }

    // Check if connection already exists
    const [existingConnection] = await db
      .select()
      .from(connections)
      .where(
        or(
          and(
            eq(connections.userAId, user.id),
            eq(connections.userBId, targetUserId)
          ),
          and(
            eq(connections.userAId, targetUserId),
            eq(connections.userBId, user.id)
          )
        )
      );

    if (existingConnection) {
      return NextResponse.json(
        { error: "Connection already exists" },
        { status: 400 }
      );
    }

    const [newConnection] = await db
      .insert(connections)
      .values({
        userAId: user.id,
        userBId: targetUserId,
        status: "pending",
      })
      .returning();

    return NextResponse.json(newConnection);
  } catch (error) {
    console.error("Error creating connection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 