import mongoose from 'mongoose';
let cachedConnection = (globalThis as any).__mongooseConn as Promise<typeof mongoose> | undefined

export async function connectDB() {
  try {
      if (!cachedConnection) {
          const uri = process.env.MONGODB_URI || ''
          mongoose.set('strictQuery', true)
          cachedConnection = mongoose.connect(uri)
          console.log('Connected to MONGO DB!')
      }
        await cachedConnection
  }
  catch (error) {
    console.log(error)
    console.log('Error connecting to MongoDB!')
  }
}
