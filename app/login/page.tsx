"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [userType, setUserType] = useState("company")
  const [error, setError] = useState("")
  const [resendStatus, setResendStatus] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    // ... existing code ...
    if (res.status === 403) {
      setError("Please verify your email before logging in. Check your inbox for a verification link.")
      return
    }
    // ... existing code ...
  }

  const handleResend = async () => {
    setResendStatus("")
    setLoading(true)
    const email = document.getElementById("email").value
    if (!email) {
      setResendStatus("Please enter your email above first.")
      setLoading(false)
      return
    }
    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setResendStatus("Verification email sent! Check your inbox.")
      } else {
        const data = await res.json()
        setResendStatus(data.error || "Failed to resend email.")
      }
    } catch {
      setResendStatus("Failed to resend email.")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2">
        <img src="/credibly-logo.png" alt="Credibly Logo" className="h-12 w-auto" />
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Log in</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <RadioGroup defaultValue="company" className="flex space-x-2" value={userType} onValueChange={setUserType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company">Company Admin</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="employee" id="employee" />
                <Label htmlFor="employee">Employee</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Log in
          </Button>
          {error && (
            <div className="text-red-600 text-center mt-2">
              {error}
              {error.startsWith("Please verify your email") && (
                <div className="mt-2 flex flex-col items-center">
                  <Button variant="outline" size="sm" onClick={handleResend} disabled={loading}>
                    {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                    Resend verification email
                  </Button>
                  {resendStatus && <div className="text-xs mt-1 text-muted-foreground">{resendStatus}</div>}
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
