import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import { createError, ErrorCodes } from '@/lib/utils/error';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get current user session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw createError('Unauthorized', ErrorCodes.AUTHENTICATION, 401);
    }

    // Connect to database
    await connectToDatabase();

    // Find the rating
    const userProfile = await UserProfile.findOne({
      'ratings.id': params.id
    });

    if (!userProfile) {
      throw createError('Rating not found', ErrorCodes.NOT_FOUND, 404);
    }

    // Check if user is authorized to delete
    const rating = userProfile.ratings.find(r => r.id === params.id);
    if (!rating) {
      throw createError('Rating not found', ErrorCodes.NOT_FOUND, 404);
    }

    // Only allow deletion by the user who created the rating or an admin
    if (rating.ratedBy !== session.user.id && !session.user.isAdmin) {
      throw createError('Not authorized to delete this rating', ErrorCodes.AUTHORIZATION, 403);
    }

    // Remove the rating
    userProfile.ratings = userProfile.ratings.filter(r => r.id !== params.id);

    // Recalculate average rating
    if (userProfile.ratings.length > 0) {
      const sum = userProfile.ratings.reduce((acc, r) => acc + r.rating, 0);
      userProfile.averageRating = sum / userProfile.ratings.length;
    } else {
      userProfile.averageRating = 0;
    }

    // Save changes
    await userProfile.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting rating:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error instanceof Error ? 500 : 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete rating' },
      { status: 500 }
    );
  }
} 