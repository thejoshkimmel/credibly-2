"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/users/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ displayName, bio, location, profilePicture }),
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to update profile");
    }
    setSubmitting(false);
  }

  return (
    <main className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Display Name</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            className="w-full border rounded px-2 py-1"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
            maxLength={300}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Profile Picture URL</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={profilePicture}
            onChange={e => setProfilePicture(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save and Continue"}
        </button>
        {error && <div className="text-red-600 text-center mt-2">{error}</div>}
      </form>
    </main>
  );
} 