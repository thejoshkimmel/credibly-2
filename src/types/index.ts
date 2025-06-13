export interface User {
  id: string
  username: string
  email: string
  role: 'user' | 'admin'
  department: string
  image?: string
  fallbackImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Rating {
  id: string
  raterId: string
  ratedUserId: string
  category: string
  score: number
  comment?: string
  createdAt: Date
  updatedAt: Date
}

export interface Connection {
  id: string
  userId: string
  connectedUserId: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
}

export interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export interface RatingsContextType {
  ratings: Rating[]
  isLoading: boolean
  error: string | null
  fetchRatings: () => Promise<void>
  addRating: (rating: Omit<Rating, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
}

export interface GroupsContextType {
  groups: string[]
  isLoading: boolean
  error: string | null
  fetchGroups: () => Promise<void>
  addGroup: (group: string) => Promise<void>
  removeGroup: (group: string) => Promise<void>
}

export interface Message {
  id: string
  userId: string
  message: string
  time: string
  user: {
    name: string
    image: string
    fallbackImage: string
  }
}

export interface DashboardStats {
  totalEmployees: number
  teams: number
  averageScore: number
  pendingRatings: number
}

export interface RecentEmployee {
  id: string
  name: string
  role: string
  department: string
  score: number
  image: string
  fallbackImage: string
}

export interface RecentMessage {
  id: string
  name: string
  message: string
  time: string
  image: string
  fallbackImage: string
} 