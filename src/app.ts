import express from 'express'
import cors from 'cors'
import {taskRouter} from "./routes/task.routes.js"

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

    return app
}
