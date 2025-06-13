import styles from "./LoadingSpinner.module.css"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function LoadingSpinner({ size = "medium", className }: LoadingSpinnerProps) {
  return (
    <div className={styles.spinner}>
      <div
        className={cn(
          styles.spinnerInner,
          styles[size],
          className
        )}
      />
    </div>
  )
} 