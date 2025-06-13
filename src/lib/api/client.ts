import { ApiResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error || 'Something went wrong'
    );
  }

  return data;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    return handleResponse<ApiResponse<T>>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error');
  }
}

// API Methods
export const api = {
  get: <T>(endpoint: string) => 
    apiRequest<T>(endpoint, { method: 'GET' }),

  post: <T>(endpoint: string, data: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string) =>
    apiRequest<T>(endpoint, { method: 'DELETE' }),

  patch: <T>(endpoint: string, data: unknown) =>
    apiRequest<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
}; 