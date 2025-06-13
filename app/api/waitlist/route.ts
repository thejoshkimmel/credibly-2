import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 })
  // ... existing code ...
  return NextResponse.json({ success: true })
} 