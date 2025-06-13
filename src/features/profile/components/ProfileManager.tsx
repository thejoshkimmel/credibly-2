import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RatingManager } from '@/features/ratings/components/RatingManager';
import { UserProfile } from '@/types';
import { toast } from 'sonner';
import { handleError } from '@/lib/utils/error';
import Image from 'next/image';

interface ProfileManagerProps {
  initialProfile: UserProfile;
  onProfileUpdate?: (updatedProfile: UserProfile) => void;
}

export function ProfileManager({ initialProfile, onProfileUpdate }: ProfileManagerProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(profile.profilePic || '');

  // Handle profile picture change
  const handleProfilePicChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, []);

  // Handle profile update
  const handleProfileUpdate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('bio', profile.bio || '');
      if (profilePic) {
        formData.append('profilePic', profilePic);
      }

      // Update profile
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
      
      if (onProfileUpdate) {
        onProfileUpdate(updatedProfile);
      }

      toast.success('Profile updated successfully!');
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [profile, profilePic, onProfileUpdate]);

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-24">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={profile.name}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl text-gray-500">
                  {profile.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          {isEditing && (
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
                id="profile-pic"
              />
              <label htmlFor="profile-pic">
                <Button variant="outline" asChild>
                  <span>Change Photo</span>
                </Button>
              </label>
            </div>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your name"
            />
            <Textarea
              value={profile.bio || ''}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself"
              rows={4}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setProfile(initialProfile);
                  setPreviewUrl(initialProfile.profilePic || '');
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            {profile.bio && <p className="text-gray-600">{profile.bio}</p>}
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </div>
        )}
      </div>

      {/* Ratings Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Ratings</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">{profile.averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({profile.totalRatings} ratings)</span>
          </div>
        </div>
        
        <RatingManager
          targetUserId={profile.userId}
          initialRatings={profile.ratings}
          onRatingsUpdate={(newRatings) => {
            setProfile(prev => ({
              ...prev,
              ratings: newRatings,
              totalRatings: newRatings.length,
              averageRating: newRatings.reduce((acc, r) => acc + r.rating, 0) / newRatings.length
            }));
          }}
        />
      </div>
    </div>
  );
} 