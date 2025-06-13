import { NextRequest, NextResponse } from 'next/server';
import UserProfile from '@/models/UserProfile';
import { connectToDatabase } from '@/lib/mongodb';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    const { email, password, firstName, lastName, userType, companyName } = await req.json();

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await UserProfile.findOne({ email }).exec();
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user profile
    await UserProfile.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType,
      companyName: userType === 'company' ? companyName : undefined,
      verified: false,
      verificationToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Send verification email
    const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
    await sendEmail({
      to: email,
      subject: 'Verify your email',
      html: `
        <h1>Welcome to Credibly!</h1>
        <p>Hi ${firstName},</p>
        <p>Thanks for signing up. Please verify your email address by clicking the link below:</p>
        <p><a href="${verifyUrl}">Verify Email Address</a></p>
        <p>If you didn't create this account, you can safely ignore this email.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'User created successfully. Please check your email to verify your account.',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
