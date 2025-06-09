"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

export default function UserDirectoryPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastUserRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users?q=${encodeURIComponent(query)}&page=${page}&limit=20`)
      .then((res) => res.json())
      .then((data) => {
        setUsers((prev) => (page === 1 ? data.users : [...prev, ...data.users]));
        setTotal(data.total);
        setHasMore(data.users.length > 0 && (page * 20 < data.total));
        setLoading(false);
      });
  }, [query, page]);

  return (
    <main className="max-w-2xl mx-auto py-8 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">User Directory</h1>
      <form
        onSubmit={e => { e.preventDefault(); }}
        className="mb-6 flex flex-col sm:flex-row gap-2 justify-center"
      >
        <input
          type="text"
          placeholder="Search by name or location..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-80"
        />
      </form>
      {users.length === 0 && !loading ? (
        <div className="text-center text-gray-500">No results found.</div>
      ) : (
        <div className="space-y-4">
          {users.map((user, i) => {
            if (i === users.length - 1) {
              return (
                <div ref={lastUserRef} key={user._id} className="p-4 border rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.profilePicture || "/placeholder-user.jpg"}
                      alt={user.displayName || "User"}
                      className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover border mx-auto sm:mx-0"
                    />
                    <div>
                      <div className="font-semibold text-lg sm:text-base">{user.displayName || "Unnamed User"}</div>
                      <div className="text-sm text-gray-500">{user.location}</div>
                    </div>
                  </div>
                  <Link
                    href={`/users/${user._id}`}
                    className="mt-2 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded text-center w-full sm:w-auto"
                  >
                    View Profile
                  </Link>
                </div>
              );
            } else {
              return (
                <div key={user._id} className="p-4 border rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.profilePicture || "/placeholder-user.jpg"}
                      alt={user.displayName || "User"}
                      className="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover border mx-auto sm:mx-0"
                    />
                    <div>
                      <div className="font-semibold text-lg sm:text-base">{user.displayName || "Unnamed User"}</div>
                      <div className="text-sm text-gray-500">{user.location}</div>
                    </div>
                  </div>
                  <Link
                    href={`/users/${user._id}`}
                    className="mt-2 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded text-center w-full sm:w-auto"
                  >
                    View Profile
                  </Link>
                </div>
              );
            }
          })}
        </div>
      )}
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {!hasMore && users.length > 0 && (
        <div className="text-center text-gray-400 mt-4">No more users to load.</div>
      )}
    </main>
  );
} 