import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(req) {
  const { email } = await req.json();
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
  await sendEmail({
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href='${resetUrl}'>here</a> to reset your password. This link expires in 1 hour.</p>`
  });
  // Always return success for privacy
  return NextResponse.json({ success: true });
} 