"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function verify() {
      if (!token) {
        setStatus("error");
        setMessage("Missing verification token.");
        return;
      }
      const res = await fetch(`/api/auth/verify-email?token=${token}`);
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Email verified! You can now log in.");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setStatus("error");
        setMessage(data.error || "Verification failed.");
      }
    }
    verify();
  }, [token, router]);

  return (
    <main className="max-w-md mx-auto py-12 px-4 text-center">
      <h1 className="text-2xl font-bold mb-6">Email Verification</h1>
      {status === null && <div>Verifying...</div>}
      {status === "success" && <div className="text-green-600 font-semibold">{message}</div>}
      {status === "error" && <div className="text-red-600 font-semibold">{message}</div>}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
} 