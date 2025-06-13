import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Animation classes
export const animations = {
  // Form animations
  formEnter: "animate-form-enter",
  formExit: "animate-form-exit",
  
  // Modal animations
  modalEnter: "animate-modal-enter",
  modalExit: "animate-modal-exit",
  
  // Star rating animations
  starHover: "hover:scale-110 hover:rotate-12 transition-transform duration-200",
  
  // Profile card animations
  cardHover: "hover:scale-105 transition-all duration-200",
  
  // General transitions
  fadeIn: "animate-fade-in",
  fadeOut: "animate-fade-out",
  slideUp: "animate-slide-up",
  slideDown: "animate-slide-down",
} 