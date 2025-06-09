import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  const db = await connectToDatabase()
  const comments = await db.collection("comments").find({ userId }).sort({ createdAt: -1 }).toArray()
  return NextResponse.json(comments)
}

export async function POST(req: NextRequest) {
  const { userId, author, text } = await req.json()
  if (!userId || !author || !text) return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  const db = await connectToDatabase()
  const comment = { userId, author, text, createdAt: new Date() }
  await db.collection("comments").insertOne(comment)
  return NextResponse.json(comment)
} 