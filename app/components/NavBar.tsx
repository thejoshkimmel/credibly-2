"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();

  useEffect(() => {
    // Simple auth check: look for a token in localStorage
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  return (
    <nav className="w-full bg-gray-900 text-white py-3 px-4 flex flex-col sm:flex-row items-center justify-between mb-8 gap-2 sm:gap-0">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto">
        <Link href="/" className="font-bold text-lg hover:underline">Home</Link>
        <Link href="/users" className="hover:underline">Search</Link>
        <Link href="/users/me" className="hover:underline">My Profile</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto">Log Out</button>
    </nav>
  );
} 