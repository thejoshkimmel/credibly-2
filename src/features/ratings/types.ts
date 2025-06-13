export interface Rating {
  id: string
  userId: string
  targetId: string
  score: number
  comment: string
  category: string
  createdAt: string
  updatedAt: string
}

export interface RatingState {
  ratings: Rating[]
  isLoading: boolean
  error: Error | null
}

export interface RatingContextType extends RatingState {
  fetchRatings: () => Promise<void>
  addRating: (rating: Omit<Rating, "id" | "createdAt" | "updatedAt">) => Promise<void>
  clearRatings: () => void
} 