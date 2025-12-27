import 'dotenv/config'
import { connectDB } from './core/db/db.js'
import { createExpressApp } from './app.js'

export async function createApp() {
  await connectDB()
  return createExpressApp()
}
