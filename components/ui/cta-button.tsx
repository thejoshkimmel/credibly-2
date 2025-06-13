"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "./button"

interface CTAButtonProps extends ButtonProps {
  pulse?: boolean
}

export function CTAButton({
  className,
  pulse = true,
  ...props
}: CTAButtonProps) {
  return (
    <Button
      className={cn(
        "relative",
        pulse && "animate-pulse-cta",
        className
      )}
      {...props}
    />
  )
} 