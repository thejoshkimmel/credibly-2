import { createContext, useContext, useState, ReactNode } from "react"
import { Rating, RatingContextType, RatingState } from "../types"
import { APIError, handleAPIError } from "@/lib/utils/error"

// Create the context with default values
const RatingsContext = createContext<RatingContextType>({
  ratings: [],
  isLoading: false,
  error: null,
  fetchRatings: async () => {},
  addRating: async () => {},
  clearRatings: () => {}
})

interface RatingsProviderProps {
  children: ReactNode
}

/**
 * RatingsProvider component that wraps the application and provides ratings context
 */
export function RatingsProvider({ children }: RatingsProviderProps) {
  // Initialize state
  const [state, setState] = useState<RatingState>({
    ratings: [],
    isLoading: false,
    error: null
  })

  /**
   * Fetch ratings from the API
   */
  const fetchRatings = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const response = await fetch("/api/ratings")
      
      if (!response.ok) {
        throw new APIError(
          "Failed to fetch ratings",
          response.status,
          "FETCH_RATINGS_FAILED"
        )
      }

      const ratings = await response.json()
      setState(prev => ({ ...prev, ratings, isLoading: false }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to fetch ratings"),
        isLoading: false
      }))
      throw error
    }
  }

  /**
   * Add a new rating
   * @param rating - The rating data to add
   */
  const addRating = async (rating: Omit<Rating, "id" | "createdAt" | "updatedAt">) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rating)
      })

      if (!response.ok) {
        throw new APIError(
          "Failed to add rating",
          response.status,
          "ADD_RATING_FAILED"
        )
      }

      const newRating = await response.json()
      setState(prev => ({
        ...prev,
        ratings: [...prev.ratings, newRating],
        isLoading: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error("Failed to add rating"),
        isLoading: false
      }))
      throw error
    }
  }

  /**
   * Clear all ratings from state
   */
  const clearRatings = () => {
    setState(prev => ({ ...prev, ratings: [] }))
  }

  // Context value
  const value: RatingContextType = {
    ...state,
    fetchRatings,
    addRating,
    clearRatings
  }

  return (
    <RatingsContext.Provider value={value}>
      {children}
    </RatingsContext.Provider>
  )
}

/**
 * Custom hook to use the ratings context
 * @returns RatingContextType
 */
export function useRatings() {
  const context = useContext(RatingsContext)
  
  if (context === undefined) {
    throw new Error("useRatings must be used within a RatingsProvider")
  }
  
  return context
} 