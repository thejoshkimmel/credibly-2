import { NextResponse } from "next/server";
import UserProfile from "@/models/UserProfile";
import { connectToDatabase } from "@/lib/mongodb";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req) {
  await connectToDatabase();
  const { email } = await req.json();
  const user = await UserProfile.findOne({ userId: email });
  if (user) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href='${resetUrl}'>here</a> to reset your password. This link expires in 1 hour.</p>`
    });
  }
  // Always return success for privacy
  return NextResponse.json({ success: true });
} 