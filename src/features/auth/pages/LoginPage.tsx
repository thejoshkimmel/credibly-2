import { useNavigate, useLocation } from "react-router-dom"
import { LoginForm } from "../components/LoginForm"
import { useAuth } from "../hooks/useAuth"

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const from = location.state?.from?.pathname || "/dashboard"

  const handleLogin = async (email: string, password: string) => {
    await login(email, password)
    navigate(from, { replace: true })
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <LoginForm onSubmit={handleLogin} />
    </div>
  )
} 