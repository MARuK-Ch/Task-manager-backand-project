import { createExpressApp } from '../app'
import { connectDB } from '../core/db/db'

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
