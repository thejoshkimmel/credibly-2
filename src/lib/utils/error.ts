import { toast } from 'sonner';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleError(error: unknown): void {
  if (error instanceof AppError) {
    toast.error(error.message);
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error('An unexpected error occurred');
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function createError(
  message: string,
  code: string,
  status?: number
): AppError {
  return new AppError(message, code, status);
}

// Common error codes
export const ErrorCodes = {
  AUTHENTICATION: 'AUTH_ERROR',
  AUTHORIZATION: 'FORBIDDEN',
  VALIDATION: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMIT: 'RATE_LIMIT',
  SERVER: 'SERVER_ERROR',
} as const;

// Common error messages
export const ErrorMessages = {
  UNAUTHORIZED: 'Please log in to continue',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  RATE_LIMIT: 'Too many requests. Please try again later',
  SERVER: 'An unexpected error occurred. Please try again later',
} as const; 