const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
}

export const api = {
  // Users
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/users`);
    return handleResponse(response);
  },

  async createUser(userData: {
    name: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
    avatar?: string;
    bio?: string;
  }) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  async getUser(id: string) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return handleResponse(response);
  },

  async updateUser(id: string, updates: Partial<{
    name: string;
    email: string;
    role: 'admin' | 'user' | 'moderator';
    avatar: string;
    bio: string;
  }>) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  async deleteUser(id: string) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },

  // Ratings
  async createRating(ratingData: {
    reviewerId: string;
    reviewedId: string;
    score: number;
    comment: string;
    category: string;
    tags: string[];
  }) {
    const response = await fetch(`${API_BASE_URL}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ratingData),
    });
    return handleResponse(response);
  },

  async getRatingsByUser(userId: string) {
    const response = await fetch(`${API_BASE_URL}/ratings/user/${userId}`);
    return handleResponse(response);
  },

  // Auth
  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  async register(userData: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'moderator';
  }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },
}; 