'use client';
import { useEffect, useState } from 'react';

export default function ExplorePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      const res = await fetch('/api/explore');
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    }
    fetchTrending();
  }, []);

  return (
    <main className="max-w-2xl mx-auto py-8 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Trending Users</h1>
      {loading ? (
        <div>Loading...</div>
      ) : users.length === 0 ? (
        <div>No trending users found.</div>
      ) : (
        <div className="space-y-4">
          {users.map((user, i) => (
            <div
              key={user._id}
              className="p-4 border rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="font-semibold text-lg sm:text-base">User ID: {user._id}</div>
                <div className="text-sm text-gray-500">Ratings: {user.count}</div>
              </div>
              <div className="text-lg sm:text-xl font-bold text-yellow-600">
                Avg Score: {user.avgScore?.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
