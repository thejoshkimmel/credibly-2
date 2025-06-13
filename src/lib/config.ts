import { z } from "zod"

// Define the schema for environment variables
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // Authentication
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string(),
  
  // API
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  
  // Environment
  NODE_ENV: z.enum(["development", "production", "test"]),
})

// Create a type from the schema
type Env = z.infer<typeof envSchema>

// Validate environment variables
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .map(err => err.path.join("."))
        .join(", ")
      throw new Error(`Missing or invalid environment variables: ${missingVars}`)
    }
    throw error
  }
}

// Export validated environment variables
export const env = validateEnv()

// Export configuration object
export const config = {
  database: {
    url: env.DATABASE_URL,
  },
  auth: {
    jwtSecret: env.JWT_SECRET,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
  },
  api: {
    baseUrl: env.API_BASE_URL,
    publicBaseUrl: env.NEXT_PUBLIC_API_BASE_URL,
  },
  isDevelopment: env.NODE_ENV === "development",
  isProduction: env.NODE_ENV === "production",
  isTest: env.NODE_ENV === "test",
} as const 