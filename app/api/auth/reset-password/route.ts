import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ error: "Missing token or password" }, { status: 400 });
  }
  // ... existing code ...
  return NextResponse.json({ success: true });
} 