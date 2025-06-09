"use client";
import { useState, useEffect } from "react";

const categories = ["Personality", "Professionalism", "Social Skills"];

export default function RatingForm({ raterId, rateeId }) {
  const [ratings, setRatings] = useState({
    Personality: 0,
    Professionalism: 0,
    "Social Skills": 0,
  });
  const [averages, setAverages] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAverages() {
      const avgs = {};
      for (const category of categories) {
        const res = await fetch(`/api/ratings?rateeId=${rateeId}&category=${encodeURIComponent(category)}`);
        const data = await res.json();
        if (data.length > 0) {
          avgs[category] = (data.reduce((sum, r) => sum + (r.stars || 0), 0) / data.length).toFixed(2);
        } else {
          avgs[category] = "N/A";
        }
      }
      setAverages(avgs);
      setLoading(false);
    }
    fetchAverages();
  }, [rateeId]);

  const handleStarClick = (category, stars) => {
    setRatings((prev) => ({ ...prev, [category]: stars }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    for (const category of categories) {
      await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          raterId,
          rateeId,
          category,
          stars: ratings[category],
        }),
      });
    }
    setSubmitting(false);
    alert("Ratings submitted!");
  };

  return (
    <div className="my-6 p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-bold mb-2">Rate this user</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {categories.map((category) => (
          <div key={category} className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-40 font-medium">{category}:</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{ cursor: "pointer", color: ratings[category] >= star ? "#fbbf24" : "#d1d5db", fontSize: "2rem" }}
                  onClick={() => handleStarClick(category, star)}
                  data-testid={`star-${category}-${star}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              Avg: {loading ? "..." : averages[category]}
            </span>
          </div>
        ))}
        <button type="submit" className="mt-2 px-4 py-2 bg-blue-600 text-white rounded" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Ratings"}
        </button>
      </form>
    </div>
  );
} 