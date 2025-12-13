import { createExpressApp } from '../app.js'
import { connectDB } from '../db/db.js'

let dbReady: Promise<void> | null = null
function ensureDB() {
    if (!dbReady) {
        dbReady = connectDB().catch(err => {
            dbReady = null
            throw err
        })
    }
    return dbReady
}

let app: ReturnType<typeof createExpressApp> | null = null

export default async function handler(req: any, res: any) {
    await ensureDB()
    if (!app) {
        app = createExpressApp()
    }
    return app(req, res)
}
