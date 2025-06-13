import { NextResponse } from 'next/server';
import UserProfile from '@/models/UserProfile';
import { connectToDatabase } from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('Login API route called');
  await connectToDatabase();
  try {
    const { email, password } = await req.json();
    console.log('Login attempt for email:', email);

    // Find user profile by email
    const user = await UserProfile.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.verified) {
      console.log('User not verified:', email);
      return NextResponse.json(
        { error: 'Please verify your email before logging in.' },
        { status: 403 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('Generated token for user:', email);

    // Create response with cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    console.log('Cookie set, returning response');
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
