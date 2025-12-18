import express from 'express'
import cors from 'cors'
import {taskRouter} from "./features/task/task.routes"
import authRoutes from "./features/auth/auth.routes";

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

    app.get('/test', (req, res) => res.json({ message: 'server is working' }))

    app.use('/api/tasks', taskRouter)
    app.use('/api/auth', authRoutes)

    return app
}
