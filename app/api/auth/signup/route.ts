import { NextRequest, NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import { connectToDatabase } from "@/lib/mongodb";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req) {
  await connectToDatabase();
  const { email, password } = await req.json();
  // ... existing user creation logic ...
  // Generate verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  // Save user profile with token and verified: false
  const user = await UserProfile.create({
    userId: email, // or your auth userId
    displayName: email,
    verified: false,
    verificationToken,
  });
  // Send verification email
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href='${verifyUrl}'>here</a> to verify your email.</p>`
  });
  return NextResponse.json({ success: true });
} 