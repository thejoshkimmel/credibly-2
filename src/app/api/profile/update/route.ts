import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import { createError, ErrorCodes } from '@/lib/utils/error';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
  try {
    // Get current user session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw createError('Unauthorized', ErrorCodes.AUTHENTICATION, 401);
    }

    // Connect to database
    await connectToDatabase();

    // Get form data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const bio = formData.get('bio') as string;
    const profilePic = formData.get('profilePic') as File | null;

    // Validate input
    if (!name) {
      throw createError('Name is required', ErrorCodes.VALIDATION, 400);
    }

    // Find user profile
    let userProfile = await UserProfile.findOne({ userId: session.user.id });
    if (!userProfile) {
      throw createError('Profile not found', ErrorCodes.NOT_FOUND, 404);
    }

    // Handle profile picture upload
    let profilePicUrl = userProfile.profilePic;
    if (profilePic) {
      const bytes = await profilePic.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const filename = `${session.user.id}-${Date.now()}.${profilePic.type.split('/')[1]}`;
      const path = join(process.cwd(), 'public', 'uploads', filename);
      
      // Save file
      await writeFile(path, buffer);
      profilePicUrl = `/uploads/${filename}`;
    }

    // Update profile
    userProfile.name = name;
    userProfile.bio = bio;
    if (profilePicUrl) {
      userProfile.profilePic = profilePicUrl;
    }

    // Save changes
    await userProfile.save();

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error instanceof Error ? 500 : 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 