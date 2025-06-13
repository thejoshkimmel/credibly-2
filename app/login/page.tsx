'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [userType, setUserType] = useState('company');
  const [error, setError] = useState('');
  const [resendStatus, setResendStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting login form');
    setError('');
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      console.log('Sending login request for:', email);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await res.json();
      console.log('Login response:', { status: res.status, data });

      if (res.status === 403) {
        setError(
          'Please verify your email before logging in. Check your inbox for a verification link.'
        );
        return;
      }
      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Wait a moment for the cookie to be set
      await new Promise(resolve => setTimeout(resolve, 100));

      // Check if the cookie was set
      const token = Cookies.get('token');
      console.log('Token after login:', token);

      if (!token) {
        setError('Login failed. Please try again.');
        return;
      }

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
  };

  const handleResend = async () => {
    setResendStatus('');
    setLoading(true);
    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const email = emailInput?.value;
    if (!email) {
      setResendStatus('Please enter your email above first.');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setResendStatus('Verification email sent! Check your inbox.');
      } else {
        const data = await res.json();
        setResendStatus(data.error || 'Failed to resend email.');
      }
    } catch {
      setResendStatus('Failed to resend email.');
    }
    setLoading(false);
  };

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
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <RadioGroup
                defaultValue="company"
                className="flex space-x-2"
                value={userType}
                onValueChange={setUserType}
              >
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
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
              Log in
            </button>
            {error && (
              <div className="text-red-600 text-center mt-2">
                {error}
                {error.startsWith('Please verify your email') && (
                  <div className="mt-2 flex flex-col items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleResend}
                      disabled={loading}
                      type="button"
                    >
                      {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                      Resend verification email
                    </Button>
                    {resendStatus && (
                      <div className="text-xs mt-1 text-muted-foreground">{resendStatus}</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </form>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
