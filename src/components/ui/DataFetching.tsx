import { ReactNode } from "react"
import { useFetch } from "@/lib/hooks/useFetch"
import { LoadingSpinner } from "./LoadingSpinner"
import { ErrorMessage } from "./ErrorMessage"
import styles from "./DataFetching.module.css"

interface DataFetchingProps<T> {
  url: string
  children: (data: T) => ReactNode
  loadingFallback?: ReactNode
  errorFallback?: (error: Error, retry: () => void) => ReactNode
}

export function DataFetching<T>({
  url,
  children,
  loadingFallback,
  errorFallback
}: DataFetchingProps<T>) {
  const { data, isLoading, error } = useFetch<T>(url)

  if (isLoading) {
    return loadingFallback || (
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonText} style={{ width: "60%" }} />
          <div className={styles.skeletonBlock} style={{ marginTop: "1rem" }} />
        </div>
      </div>
    )
  }

  if (error) {
    if (errorFallback) {
      return errorFallback(error, () => {
        // Force refetch by changing the URL slightly
        window.location.reload()
      })
    }
    return <ErrorMessage error={error} onRetry={() => window.location.reload()} />
  }

  if (!data) {
    return null
  }

  return <div className={styles.container}>{children(data)}</div>
} 