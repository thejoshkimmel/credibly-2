"use client";
import { useState } from "react";

const criteriaList = ["professionalism", "timeliness", "communication"];

export default function RatingSubmissionForm({ ratedUserId, raterUserId }: { ratedUserId: string, raterUserId: string }) {
  const [criteria, setCriteria] = useState({
    professionalism: 0,
    timeliness: 0,
    communication: 0,
    overall: 0,
  });
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  if (!ratedUserId || !raterUserId) {
    return <div className="text-center text-red-600 font-semibold my-8">User not found or invalid rating request.</div>;
  }

  const handleStarClick = (key: string, value: number) => {
    setCriteria((prev) => {
      const updated = { ...prev, [key]: value };
      // Calculate overall as the average of the three
      updated.overall = Math.round((updated.professionalism + updated.timeliness + updated.communication) / 3);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raterUserId, ratedUserId, criteria, comment }),
      });
      if (res.ok) {
        setMessage("Rating submitted!");
        setCriteria({ professionalism: 0, timeliness: 0, communication: 0, overall: 0 });
        setComment("");
      } else {
        const data = await res.json();
        setMessage(data.error || "Error submitting rating");
      }
    } catch (err) {
      setMessage("Error submitting rating");
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-white max-w-xl mx-auto my-6 space-y-4">
      <h3 className="text-lg font-bold mb-2">Leave a Rating</h3>
      {criteriaList.map((key) => (
        <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2">
          <label className="w-40 font-medium capitalize">{key}:</label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{ cursor: "pointer", color: criteria[key] >= star ? "#fbbf24" : "#d1d5db", fontSize: "2rem" }}
                onClick={() => handleStarClick(key, star)}
                data-testid={`star-${key}-${star}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
      <div>
        <label className="block font-medium mb-1">Comment:</label>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={comment}
          onChange={e => setComment(e.target.value)}
          maxLength={300}
          rows={3}
          placeholder="Write a comment..."
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={submitting || !criteria.professionalism || !criteria.timeliness || !criteria.communication}
      >
        {submitting ? "Submitting..." : "Submit Rating"}
      </button>
      {message && <div className="mt-2 text-center text-green-600">{message}</div>}
    </form>
  );
} 