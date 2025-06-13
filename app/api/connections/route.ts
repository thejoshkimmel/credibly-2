import { NextRequest, NextResponse } from 'next/server';
import Connection from '@/models/Connection';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req) {
  await connectToDatabase();
  const { userA, userB } = await req.json();
  if (!userA || !userB) {
    return NextResponse.json({ error: 'Missing userA or userB' }, { status: 400 });
  }
  // Prevent duplicate requests
  const existing = await Connection.findOne({
    $or: [
      { userA, userB },
      { userA: userB, userB: userA },
    ],
    status: { $in: ['pending', 'accepted'] },
  });
  if (existing) {
    return NextResponse.json({ error: 'Connection already exists or pending' }, { status: 409 });
  }
  const connection = await Connection.create({ userA, userB, status: 'pending' });
  return NextResponse.json(connection);
}
