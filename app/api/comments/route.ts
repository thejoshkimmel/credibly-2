import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  return NextResponse.json({ error: "MongoDB/mongoose related code removed" }, { status: 501 })
}

export async function POST(req: NextRequest) {
  const { userId, author, text } = await req.json()
  if (!userId || !author || !text) return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  return NextResponse.json({ error: "MongoDB/mongoose related code removed" }, { status: 501 })
} 