import { NextRequest, NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectToDatabase();
  const { token, password } = await req.json();
  if (!token || !password) {
    return NextResponse.json({ error: "Missing token or password" }, { status: 400 });
  }
  const user = await UserProfile.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return NextResponse.json({ success: true });
} 