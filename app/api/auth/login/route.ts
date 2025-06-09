import { NextRequest, NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import { connectToDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectToDatabase();
  const { email, password } = await req.json();
  // ... existing user authentication logic ...
  // Find user profile
  const user = await UserProfile.findOne({ userId: email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (!user.verified) {
    return NextResponse.json({ error: "Please verify your email before logging in." }, { status: 403 });
  }
  // ... password check and JWT logic ...
  const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return NextResponse.json({ token });
} 