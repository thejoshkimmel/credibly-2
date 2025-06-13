import styles from "./ErrorMessage.module.css"

interface ErrorMessageProps {
  error: Error
  onRetry?: () => void
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <div className={styles.errorContent}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.errorIcon}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className={styles.errorMessage}>{error.message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className={styles.retryButton}
        >
          Try again
        </button>
      )}
    </div>
  )
} 