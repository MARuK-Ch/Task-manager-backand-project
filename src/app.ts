import express from 'express'
import cors from 'cors'
import { taskRouter } from './features/task/task.routes.js'
import authRoutes from "./features/auth/auth.routes.js";

export function createExpressApp() {
  const app = express()

  const allowedOrigin = "https://task-manager-front-parcel-project.vercel.app"

  // CORS — максимально корректная версия для Vercel
  app.use(cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }))

  // Обработка preflight (иначе POST ломается)
  app.options("*", cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }))

  app.use(express.json())

  // тестовый запрос
  app.get('/test', (_req, res) => {
    res.json({ message: 'Server is working!' })
  })

  app.use('/api/tasks', taskRouter)
  app.use('/api/auth', authRoutes)

  return app
}
