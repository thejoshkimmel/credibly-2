import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { connections } from "@/db/schema";
import { eq, and, or } from "drizzle-orm";

export async function GET(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [connection] = await db
      .select()
      .from(connections)
      .where(
        and(
          eq(connections.id, parseInt(params.id)),
          or(
            eq(connections.userAId, user.id),
            eq(connections.userBId, user.id)
          )
        )
      );

    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    return NextResponse.json(connection);
  } catch (error) {
    console.error("Error fetching connection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    const [connection] = await db
      .select()
      .from(connections)
      .where(
        and(
          eq(connections.id, parseInt(params.id)),
          or(
            eq(connections.userAId, user.id),
            eq(connections.userBId, user.id)
          )
        )
      );

    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    const [updatedConnection] = await db
      .update(connections)
      .set({ status, updatedAt: new Date() })
      .where(eq(connections.id, parseInt(params.id)))
      .returning();

    return NextResponse.json(updatedConnection);
  } catch (error) {
    console.error("Error updating connection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [connection] = await db
      .select()
      .from(connections)
      .where(
        and(
          eq(connections.id, parseInt(params.id)),
          or(
            eq(connections.userAId, user.id),
            eq(connections.userBId, user.id)
          )
        )
      );

    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    await db
      .delete(connections)
      .where(eq(connections.id, parseInt(params.id)));

    return NextResponse.json({ message: "Connection deleted successfully" });
  } catch (error) {
    console.error("Error deleting connection:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 