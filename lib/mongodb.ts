import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
let client: MongoClient | null = null

export async function connectToDatabase() {
  if (!uri) throw new Error("Please define the MONGODB_URI environment variable")
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client.db()
} 