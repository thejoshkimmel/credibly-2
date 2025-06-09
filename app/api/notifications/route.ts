import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")
  if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  const db = await connectToDatabase()
  const notifications = await db.collection("notifications").find({ userId }).sort({ createdAt: -1 }).toArray()
  return NextResponse.json(notifications)
}

export async function POST(req: NextRequest) {
  const { userId, type, message } = await req.json()
  if (!userId || !type || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  const db = await connectToDatabase()
  const notification = { userId, type, message, createdAt: new Date(), read: false }
  await db.collection("notifications").insertOne(notification)
  return NextResponse.json(notification)
} 