import { useState, useEffect } from 'react';
import { UserProfile as UserProfileType, Rating } from '@/types/user';
import { api } from '@/lib/api';
import { RatingForm } from './RatingForm';

interface UserProfileProps {
  userId: string;
  currentUserId: string;
}

export function UserProfile({ userId, currentUserId }: UserProfileProps) {
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRatingForm, setShowRatingForm] = useState(false);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [profileResponse, ratingsResponse] = await Promise.all([
        api.getUser(userId),
        api.getRatingsByUser(userId)
      ]);

      setProfile(profileResponse.data.user);
      setRatings(ratingsResponse.data.ratings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleRatingSubmitted = () => {
    setShowRatingForm(false);
    fetchUserData(); // Refresh data after new rating
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-red-50 text-red-500 p-4 rounded-md">
        {error || 'Failed to load user profile'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl text-gray-500">
                {profile.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500">{profile.email}</p>
            <p className="text-sm text-gray-500">Role: {profile.role}</p>
          </div>
        </div>
        {profile.bio && (
          <p className="mt-4 text-gray-600">{profile.bio}</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">
            {profile.stats.totalRatings}
          </div>
          <div className="text-sm text-gray-500">Total Ratings</div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">
            {profile.stats.averageRating}
          </div>
          <div className="text-sm text-gray-500">Average Rating</div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">
            {profile.stats.totalReviews}
          </div>
          <div className="text-sm text-gray-500">Reviews Given</div>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">
            {profile.stats.followers}
          </div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
      </div>

      {/* Rating Form */}
      {currentUserId !== userId && (
        <div className="bg-white shadow rounded-lg p-6">
          {showRatingForm ? (
            <RatingForm
              reviewerId={currentUserId}
              reviewedId={userId}
              onRatingSubmitted={handleRatingSubmitted}
            />
          ) : (
            <button
              onClick={() => setShowRatingForm(true)}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Rate User
            </button>
          )}
        </div>
      )}

      {/* Ratings List */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ratings</h2>
        {ratings.length === 0 ? (
          <p className="text-gray-500">No ratings yet</p>
        ) : (
          <div className="space-y-4">
            {ratings.map((rating) => (
              <div key={rating.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-blue-500">
                      {rating.score}
                    </span>
                    <span className="text-gray-500">/ 5</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{rating.comment}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {rating.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 