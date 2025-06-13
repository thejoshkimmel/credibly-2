import { Pool } from "pg"
import { config } from "../config"

// Create a new pool using the database URL from environment variables
export const pool = new Pool({
  connectionString: config.database.url,
  ssl: config.isProduction ? { rejectUnauthorized: false } : undefined,
})

// Test the connection
pool.on("connect", () => {
  console.log("Connected to database")
})

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

// Export a function to run queries
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T> {
  const start = Date.now()
  try {
    const res = await pool.query(text, params)
    const duration = Date.now() - start
    console.log("Executed query", { text, duration, rows: res.rowCount })
    return res.rows
  } catch (error) {
    console.error("Error executing query", { text, error })
    throw error
  }
} 