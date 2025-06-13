import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/verify-email?token=${crypto.randomBytes(32).toString("hex")}`;
  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href='${verifyUrl}'>here</a> to verify your email.</p>`
  });
  return NextResponse.json({ success: true });
} 