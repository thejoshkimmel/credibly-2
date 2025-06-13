import { ReactNode } from "react"
import { Loader2 } from "lucide-react"

interface ListProps<T> {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor: (item: T) => string | number
  isLoading?: boolean
  emptyMessage?: string
  className?: string
  itemClassName?: string
}

export function List<T>({
  items,
  renderItem,
  keyExtractor,
  isLoading = false,
  emptyMessage = "No items found",
  className = "",
  itemClassName = ""
}: ListProps<T>) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 text-muted-foreground">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div key={keyExtractor(item)} className={itemClassName}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  )
} 