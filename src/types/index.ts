export interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  image: string
  fallbackImage: string
  rating: number
  reviews: number
  stats: {
    totalRatings: number
    averageRating: number
    departmentRank: number
  }
}

export interface Rating {
  id: string
  userId: string
  date: string
  comment: string
  categories: {
    name: string
    score: number
  }[]
  user: {
    name: string
    image: string
    fallbackImage: string
  }
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