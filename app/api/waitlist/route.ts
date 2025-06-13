import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  const db = await connectToDatabase();
  const existing = await db.collection('waitlist').findOne({ email });
  if (existing) return NextResponse.json({ error: 'Email already on waitlist' }, { status: 409 });
  const entry = { email, createdAt: new Date() };
  await db.collection('waitlist').insertOne(entry);
  return NextResponse.json({ success: true });
}
