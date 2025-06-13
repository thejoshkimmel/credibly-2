import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';
import { isValidEmail } from '@/utils/validation';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.auth.getCurrentUser();
      
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
      setError(err instanceof Error ? err.message : 'Failed to check authentication status');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      checkAuthStatus();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!isValidEmail(email)) {
        throw new Error('Invalid email format');
      }

      const response = await api.auth.login(email, password);
      
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        router.push('/dashboard');
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during login';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      router.push('/login');
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 