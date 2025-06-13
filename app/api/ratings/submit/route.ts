import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import UserProfile from '@/models/UserProfile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    // Get the current user's session
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Connect to database
    await connectToDatabase();

    // Get request body
    const { targetUserId, rating, comment } = await req.json();

    // Validate input
    if (!targetUserId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Invalid rating data' }, { status: 400 });
    }

    // Find the target user
    const targetUser = await UserProfile.findOne({ userId: targetUserId });
    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Initialize ratings array if it doesn't exist
    if (!targetUser.ratings) {
      targetUser.ratings = [];
    }

    // Add the new rating
    targetUser.ratings.push({
      rating,
      comment,
      ratedBy: session.user.id,
      createdAt: new Date(),
    });

    // Calculate new average rating
    const totalRatings = targetUser.ratings.length;
    const sumRatings = targetUser.ratings.reduce((sum, r) => sum + r.rating, 0);
    targetUser.averageRating = sumRatings / totalRatings;

    // Save the updated user profile
    await targetUser.save();

    return NextResponse.json({
      success: true,
      newAverageRating: targetUser.averageRating,
      totalRatings: totalRatings,
    });
  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 });
  }
}
