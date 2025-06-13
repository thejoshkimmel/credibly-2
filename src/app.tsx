import { AppRouter } from "./app/router"
import { AuthProvider } from "@/features/auth/context/AuthContext"

export function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
} 