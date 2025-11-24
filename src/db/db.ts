import * as mongoose from "mongoose";
import 'dotenv/config'

export async function connectDB() {
    try {
        const uri: string = process.env.MONGODB_URI || ''
        mongoose.set('strictQuery', true)
        await mongoose.connect(uri)
        console.log('connected to MongoDB')
    }
    catch (error) {
        console.log(error)
        console.log("Error connecting to MongoDB")
    }
}
