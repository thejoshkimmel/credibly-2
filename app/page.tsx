"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function HomePage() {
  const [ratings, setRatings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRatings() {
      const res = await fetch("/api/ratings?recent=true")
      const data = await res.json()
      setRatings(data)
      setLoading(false)
    }
    fetchRatings()
  }, [])

  return (
    <main className="max-w-2xl mx-auto py-8 px-2 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Recent Ratings Feed</h1>
      {loading ? (
        <div>Loading...</div>
      ) : ratings.length === 0 ? (
        <div>No recent ratings found.</div>
      ) : (
        <div className="space-y-4">
          {ratings.map((r, i) => (
            <div key={r._id || i} className="p-4 border rounded bg-white flex flex-col gap-2 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold">
                  <Link href={`/users/${r.raterUserId?._id || r.raterUserId}`}>{r.raterUserId?.displayName || "Anonymous"}</Link>
                </span>
                <span className="text-gray-500">rated</span>
                <span className="font-semibold">
                  <Link href={`/users/${r.ratedUserId?._id || r.ratedUserId}`}>{r.ratedUserId?.displayName || "User"}</Link>
                </span>
                <span className="text-xs text-gray-400 ml-2">{new Date(r.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex gap-2 text-yellow-500 mb-1">
                {[...Array(r.criteria?.overall || 0)].map((_, i) => <span key={i}>★</span>)}
              </div>
              {r.comment && <div className="text-gray-700 break-words max-w-xs sm:max-w-md">{r.comment}</div>}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
