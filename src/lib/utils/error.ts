export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message)
    this.name = "APIError"
  }
}

export function handleAPIError(error: unknown): never {
  if (error instanceof APIError) {
    throw error
  }

  if (error instanceof Error) {
    throw new APIError(error.message, 500)
  }

  throw new APIError("An unexpected error occurred", 500)
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError
} 