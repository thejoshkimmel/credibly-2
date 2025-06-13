import { User } from "@/features/auth/types"
import { APIError, handleAPIError } from "@/lib/utils/error"

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: User
  token: string
}

/**
 * Authenticate a user with email and password
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      throw new APIError(
        "Invalid credentials",
        response.status,
        "INVALID_CREDENTIALS"
      )
    }

    return response.json()
  } catch (error) {
    return handleAPIError(error)
  }
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      throw new APIError(
        "Failed to logout",
        response.status,
        "LOGOUT_FAILED"
      )
    }
  } catch (error) {
    return handleAPIError(error)
  }
}

/**
 * Update user profile information
 */
export async function updateProfile(updates: Partial<User>): Promise<User> {
  try {
    const response = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updates)
    })

    if (!response.ok) {
      throw new APIError(
        "Failed to update profile",
        response.status,
        "UPDATE_FAILED"
      )
    }

    return response.json()
  } catch (error) {
    return handleAPIError(error)
  }
} 