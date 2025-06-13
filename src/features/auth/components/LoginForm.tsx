"use client"

import { useRef, useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  // Create a ref for the email input
  const emailInputRef = useRef<HTMLInputElement>(null)
  
  // Controlled form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  // Get auth functions from context
  const { login, isLoading, error } = useAuth()

  // Focus email input on mount
  useEffect(() => {
    // The ref.current will be available after the component mounts
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, []) // Empty dependency array means this runs once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      onSuccess?.()
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              ref={emailInputRef}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 