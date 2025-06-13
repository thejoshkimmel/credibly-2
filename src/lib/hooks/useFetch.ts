import { useState, useEffect } from "react"

interface FetchState<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }))
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setState({ data, isLoading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error : new Error("An error occurred")
        })
      }
    }

    fetchData()
  }, [url])

  return state
} 