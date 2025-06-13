import { z } from 'zod';
import { createError, ErrorCodes } from './error';

// Common validation schemas
export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  );

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters');

export const ratingSchema = z
  .number()
  .min(1, 'Rating must be at least 1')
  .max(5, 'Rating must be at most 5');

// Form validation schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const ratingFormSchema = z.object({
  rating: ratingSchema,
  comment: z.string().max(500, 'Comment must be less than 500 characters').optional(),
});

// Validation helper
export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError(
        error.errors[0].message,
        ErrorCodes.VALIDATION,
        400
      );
    }
    throw error;
  }
}

// Type guards
export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function isValidPassword(password: string): boolean {
  return passwordSchema.safeParse(password).success;
}

export function isValidRating(rating: number): boolean {
  return ratingSchema.safeParse(rating).success;
} 