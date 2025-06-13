import { NextResponse } from 'next/server';
import UserProfile from '@/models/UserProfile';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  const user = await UserProfile.findOneAndUpdate(
    { verificationToken: token },
    { $set: { verified: true }, $unset: { verificationToken: '' } },
    { new: true }
  );
  if (!user) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  return NextResponse.json({ success: true });
}
