import { NextRequest, NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import { connectToDatabase } from "@/lib/mongodb";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req) {
  await connectToDatabase();
  const { email } = await req.json();
  const user = await UserProfile.findOne({ userId: email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (user.verified) return NextResponse.json({ error: "User already verified" }, { status: 400 });
  const verificationToken = crypto.randomBytes(32).toString("hex");
  user.verificationToken = verificationToken;
  await user.save();
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href='${verifyUrl}'>here</a> to verify your email.</p>`
  });
  return NextResponse.json({ success: true });
} 