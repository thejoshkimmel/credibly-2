import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ResponsiveImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  alt: string
  src: string
  sizes?: string
  priority?: boolean
  className?: string
  aspectRatio?: string
}

export function ResponsiveImage({
  alt,
  src,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  className,
  aspectRatio,
  ...props
}: ResponsiveImageProps) {
  // Convert src to WebP format
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, ".webp")
  const fallbackSrc = src

  return (
    <picture className={cn("block w-full", className)}>
      <source
        srcSet={webpSrc}
        type="image/webp"
        sizes={sizes}
      />
      <source
        srcSet={fallbackSrc}
        type="image/jpeg"
        sizes={sizes}
      />
      <Image
        src={fallbackSrc}
        alt={alt}
        className={cn(
          "h-auto w-full object-cover",
          aspectRatio && `aspect-[${aspectRatio}]`,
          className
        )}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
    </picture>
  )
}

interface AvatarImageProps extends Omit<ResponsiveImageProps, "aspectRatio"> {
  name: string
}

export function AvatarImage({ name, ...props }: AvatarImageProps) {
  return (
    <ResponsiveImage
      alt={`${name}'s profile picture`}
      aspectRatio="1"
      className="rounded-full"
      {...props}
    />
  )
}

interface LogoImageProps extends Omit<ResponsiveImageProps, "aspectRatio"> {
  priority?: boolean
}

export function LogoImage({ priority = true, ...props }: LogoImageProps) {
  return (
    <ResponsiveImage
      alt="Credibly Logo"
      aspectRatio="2.5"
      priority={priority}
      {...props}
    />
  )
} 