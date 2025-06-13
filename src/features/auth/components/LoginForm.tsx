import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { styles } from '@/lib/styles/common';
import { validate, loginSchema } from '@/lib/utils/validation';
import { handleError } from '@/lib/utils/error';
import { toast } from 'sonner';
import { FormField } from '@/components/ui/FormField';

interface LoginFormProps {
  onSuccess?: () => void;
  isDisabled?: boolean;
}

export function LoginForm({ onSuccess, isDisabled = false }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    
    setIsLoading(true);
    setFormError(undefined);

    try {
      // Validate form data
      const validatedData = validate(loginSchema, formData);

      // Attempt to sign in
      const result = await signIn('credentials', {
        redirect: false,
        email: validatedData.email,
        password: validatedData.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success('Logged in successfully!');
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      setFormError(message);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`
        ${styles.card.container} 
        ${styles.zIndex.card}
        ${isDisabled ? styles.disabled.card : ''}
        max-w-md mx-auto
      `}
    >
      <div className={styles.card.header}>
        <h2 className={styles.heading.section}>Welcome Back</h2>
        <p className={styles.text.small}>Please sign in to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {formError}
          </div>
        )}

        <FormField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          minLength={3}
          maxLength={254}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          error={formError}
          helperText="We'll never share your email with anyone else."
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          disabled={isDisabled}
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Enter your password"
          minLength={8}
          maxLength={128}
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$"
          error={formError}
          helperText="Must be at least 8 characters with letters and numbers."
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          disabled={isDisabled}
        />

        <button
          type="submit"
          disabled={isLoading || isDisabled}
          className={`
            ${styles.button.primary}
            ${(isLoading || isDisabled) ? styles.disabled.button : ''}
            w-full
          `}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className={styles.card.footer}>
        <p className={styles.text.small}>
          Don't have an account?{' '}
          <button
            onClick={() => router.push('/signup')}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            disabled={isDisabled}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
} 