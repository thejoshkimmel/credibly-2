import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";

export async function GET(req) {
  try {
    await initDatabase();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error initializing database:", error);
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 });
  }
} 