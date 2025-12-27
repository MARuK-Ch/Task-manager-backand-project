import express from 'express'
import cors from 'cors'
import { taskRouter } from './features/task/task.routes.js'
import authRoutes from "./features/auth/auth.routes.js";

export function createExpressApp() {
  const app = express()

  // Явная настройка CORS — корректно работает на Vercel
  app.use(cors({
    origin: "https://task-manager-front-parcel-project.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }))

  // Обязательная обработка preflight-запросов (иначе POST блокируется)
  app.options("*", cors())

  app.use(express.json())

  // тестовый запрос
  app.get('/test', (_req, res) => {
    res.json({ message: 'Server is working!' })
  })

  app.use('/api/tasks', taskRouter)
  app.use('/api/auth', authRoutes)

  return app
}
