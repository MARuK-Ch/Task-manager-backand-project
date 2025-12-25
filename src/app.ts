import express from 'express'
import cors from 'cors'
import {taskRouter} from './features/task/task.routes.js'
import authRoutes from "./features/auth/auth.routes.js";

export function createExpressApp() {
  const app = express()

  const corsOptions = {
      origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
      optionsSuccessStatus: 200
  }

  app.use(express.json())
  app.use(cors(corsOptions))
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
  })

  // тестовый запрос
  app.get('/test', (_req, res) => res.json({ message: 'Server is working!' }))

  app.use('/api/tasks', taskRouter)
  app.use('/api/auth', authRoutes)

  return app
}
