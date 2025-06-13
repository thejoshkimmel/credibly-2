import { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { User, AuthState, AuthAction, AuthContextType } from "../types"
import { APIError, handleAPIError } from "@/lib/utils/error"

// Storage key for persisting auth state
const AUTH_STORAGE_KEY = "auth_user"

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null
}

/**
 * Auth reducer function to handle state updates based on actions
 */
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
        error: null
      }

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null
      }

    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload
      }

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null
      }

    default:
      return state
  }
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  logout: async () => {},
  updateUser: async () => {}
})

interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider component that wraps the application and provides authentication context
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // Initialize state with reducer
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing session on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY)
        if (storedUser) {
          const user = JSON.parse(storedUser)
          dispatch({ type: "LOGIN_SUCCESS", payload: user })
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error)
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "Failed to restore session"
        })
      }
    }

    initializeAuth()
  }, [])

  /**
   * Login function that authenticates a user
   * @param email - User's email
   * @param password - User's password
   */
  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: "LOGIN_START" })

      // TODO: Replace with actual API call
      // This is a mock implementation
      const mockUser: User = {
        id: "1",
        name: "John Doe",
        email,
        role: "User",
        department: "Engineering",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        fallbackImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
      }

      // Store user in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser))
      
      dispatch({ type: "LOGIN_SUCCESS", payload: mockUser })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed"
      dispatch({ type: "LOGIN_FAILURE", payload: message })
      throw error
    }
  }

  /**
   * Logout function that clears the user's session
   */
  const logout = async () => {
    try {
      // Clear stored user data
      localStorage.removeItem(AUTH_STORAGE_KEY)
      dispatch({ type: "LOGOUT" })
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    }
  }

  /**
   * Update user profile information
   * @param updates - Partial user object containing fields to update
   */
  const updateUser = async (updates: Partial<User>) => {
    try {
      if (!state.user) {
        throw new Error("No user logged in")
      }

      const updatedUser = { ...state.user, ...updates }
      
      // Update stored user data
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser))
      
      dispatch({ type: "LOGIN_SUCCESS", payload: updatedUser })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update user"
      dispatch({ type: "LOGIN_FAILURE", payload: message })
      throw error
    }
  }

  // Context value
  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook to use the auth context
 * @returns AuthContextType
 */
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  
  return context
} 