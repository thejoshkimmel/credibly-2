// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// API error class
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// API configuration
interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers?: Record<string, string>;
}

// Default configuration
const defaultConfig: ApiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Response handler
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      throw new ApiError(
        data.message || 'An error occurred',
        response.status,
        data
      );
    }
    
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to parse response', response.status);
  }
};

// Token management
const getAuthToken = () => localStorage.getItem('authToken');
const setAuthToken = (token: string) => localStorage.setItem('authToken', token);
const removeAuthToken = () => localStorage.removeItem('authToken');

// API request builder with timeout and retry
const createRequest = async <T>(
  endpoint: string,
  options: RequestInit = {},
  config: ApiConfig = defaultConfig,
  retries = 1
): Promise<ApiResponse<T>> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const token = getAuthToken();
    const headers = {
      ...config.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const url = `${config.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error.name === 'AbortError') {
      throw new ApiError('Request timed out', 408);
    }
    if (retries > 0) {
      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, 1000 * (3 - retries)));
      return createRequest(endpoint, options, config, retries - 1);
    }
    throw new ApiError('Network error', 0);
  } finally {
    clearTimeout(timeoutId);
  }
};

// API methods with loading state tracking
export const createApiWithLoading = (config: Partial<ApiConfig> = {}) => {
  const loadingStates = new Map<string, boolean>();
  const mergedConfig = { ...defaultConfig, ...config };

  const setLoading = (key: string, isLoading: boolean) => {
    loadingStates.set(key, isLoading);
  };

  const isLoading = (key: string) => loadingStates.get(key) || false;

  const api = {
    // Auth methods
    auth: {
      login: async (email: string, password: string) => {
        setLoading('login', true);
        try {
          const response = await createRequest<{ token: string; user: any }>(
            '/auth/login',
            {
              method: 'POST',
              body: JSON.stringify({ email, password }),
            },
            mergedConfig
          );
          if (response.success && response.data?.token) {
            setAuthToken(response.data.token);
          }
          return response;
        } finally {
          setLoading('login', false);
        }
      },

      logout: async () => {
        setLoading('logout', true);
        try {
          await createRequest('/auth/logout', { method: 'POST' }, mergedConfig);
        } finally {
          removeAuthToken();
          setLoading('logout', false);
        }
      },

      getCurrentUser: async () => {
        setLoading('getCurrentUser', true);
        try {
          return await createRequest<{ user: any }>('/auth/me', { method: 'GET' }, mergedConfig);
        } finally {
          setLoading('getCurrentUser', false);
        }
      },
    },

    // Rating methods
    ratings: {
      submit: async (ratingData: any) => {
        setLoading('submitRating', true);
        try {
          return await createRequest<{ rating: any }>(
            '/ratings',
            {
              method: 'POST',
              body: JSON.stringify(ratingData),
            },
            mergedConfig
          );
        } finally {
          setLoading('submitRating', false);
        }
      },

      getRatings: async (params?: Record<string, string>) => {
        setLoading('getRatings', true);
        try {
          const queryString = params ? `?${new URLSearchParams(params)}` : '';
          return await createRequest<{ ratings: any[] }>(
            `/ratings${queryString}`,
            { method: 'GET' },
            mergedConfig
          );
        } finally {
          setLoading('getRatings', false);
        }
      },
    },

    // Profile methods
    profile: {
      get: async (userId: string) => {
        setLoading('getProfile', true);
        try {
          return await createRequest<{ profile: any }>(
            `/profiles/${userId}`,
            { method: 'GET' },
            mergedConfig
          );
        } finally {
          setLoading('getProfile', false);
        }
      },

      update: async (userId: string, profileData: any) => {
        setLoading('updateProfile', true);
        try {
          return await createRequest<{ profile: any }>(
            `/profiles/${userId}`,
            {
              method: 'PUT',
              body: JSON.stringify(profileData),
            },
            mergedConfig
          );
        } finally {
          setLoading('updateProfile', false);
        }
      },
    },

    // Generic methods
    get: async <T>(endpoint: string, key?: string) => {
      if (key) setLoading(key, true);
      try {
        return await createRequest<T>(endpoint, { method: 'GET' }, mergedConfig);
      } finally {
        if (key) setLoading(key, false);
      }
    },

    post: async <T>(endpoint: string, data: unknown, key?: string) => {
      if (key) setLoading(key, true);
      try {
        return await createRequest<T>(
          endpoint,
          {
            method: 'POST',
            body: JSON.stringify(data),
          },
          mergedConfig
        );
      } finally {
        if (key) setLoading(key, false);
      }
    },

    put: async <T>(endpoint: string, data: unknown, key?: string) => {
      if (key) setLoading(key, true);
      try {
        return await createRequest<T>(
          endpoint,
          {
            method: 'PUT',
            body: JSON.stringify(data),
          },
          mergedConfig
        );
      } finally {
        if (key) setLoading(key, false);
      }
    },

    delete: async <T>(endpoint: string, key?: string) => {
      if (key) setLoading(key, true);
      try {
        return await createRequest<T>(endpoint, { method: 'DELETE' }, mergedConfig);
      } finally {
        if (key) setLoading(key, false);
      }
    },

    isLoading,
  };

  return api;
};

// Create default API instance
export const api = createApiWithLoading(); 