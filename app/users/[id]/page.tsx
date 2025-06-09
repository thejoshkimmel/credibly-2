"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      setUser(data);
      setLoading(false);
    }
    if (id) fetchUser();
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user || user.error) return <div className="p-8 text-center text-red-600 font-semibold">User not found.</div>;

  return (
    <main className="max-w-2xl mx-auto py-8 px-2 sm:px-4">
      <div className="flex flex-col items-center gap-4 mb-8">
        <img
          src={user.profilePicture || "/placeholder-user.jpg"}
          alt={user.displayName || "User"}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border"
        />
        <h1 className="text-2xl sm:text-3xl font-bold">{user.displayName || "Unnamed User"}</h1>
        <div className="text-gray-600 text-base sm:text-lg">{user.location}</div>
        <div className="text-center text-gray-700 max-w-md text-sm sm:text-base">{user.bio}</div>
        {/* Connection Button (placeholder) */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded w-full sm:w-auto">Connect</button>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-500 text-xl sm:text-2xl">★</span>
          <span className="text-lg font-semibold">
            {user.averageRating ? user.averageRating.toFixed(2) : "N/A"}
          </span>
          <span className="text-gray-500 text-sm">({user.ratingsCount || 0} ratings)</span>
        </div>
      </div>
      <div>
        <h2 className="text-lg sm:text-xl font-bold mb-4">Reviews</h2>
        {user.ratings && user.ratings.length > 0 ? (
          <div className="space-y-4">
            {user.ratings.filter(r => r.comment).map((r, i) => (
              <div key={i} className="border rounded p-4 flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <span className="font-semibold">{r.raterUserId?.displayName || "Anonymous"}</span>
                  <span className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2 text-yellow-500 mb-1">
                  {[...Array(r.criteria.overall)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-gray-700 break-words max-w-xs sm:max-w-md">{r.comment}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">No reviews yet.</div>
        )}
      </div>
    </main>
  );
} 