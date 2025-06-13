// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  bio?: string;
  avatar?: string;
  averageRating: number;
  totalRatings: number;
  ratings: Rating[];
}

// Rating Types
export interface Rating {
  id: string;
  rating: number;
  comment?: string;
  ratedBy: string;
  ratedAt: Date;
}

// Connection Types
export interface Connection {
  id: string;
  userId: string;
  connectedUserId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'connection' | 'rating' | 'message' | 'system';
  content: string;
  read: boolean;
  createdAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
}

export interface RatingFormData {
  rating: number;
  comment?: string;
}

// Auth Types
export interface Session {
  user: User;
  expires: Date;
} 