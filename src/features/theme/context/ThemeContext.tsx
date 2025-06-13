import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {}
})

// Storage key for persisting theme preference
const THEME_STORAGE_KEY = "theme_preference"

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * ThemeProvider component that wraps the application and provides theme context
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    
    if (storedTheme) {
      return storedTheme
    }
    
    // Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })

  // Update theme in localStorage and document
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light")
  }

  // Context value
  const value: ThemeContextType = {
    theme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Custom hook to use the theme context
 * @returns ThemeContextType
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return context
} 