export interface User {
  id: string
  name: string
  email: string
  role: string
  department: string
  image?: string
  fallbackImage?: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (user: Partial<User>) => Promise<void>
} 