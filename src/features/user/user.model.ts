import { Schema, model } from 'mongoose'

export interface User {
    _id: string // по умолчанию
    email: string
    password: string
    name: string
    createAt: Date // по умолчанию
    updateAt: Date // по умолчанию
}

const UserSchema = new Schema<User>({
    email: { type: String, required: true, trim: true, minLength: 5, maxLength: 200 },
    password: { type: String, required: true, trim: true, minLength: 8, maxLength: 200 },
    name: { type: String, required: false, trim: true, minLength: 1, maxLength: 200, default: null },
}, { timestamps: true })

export const UserModel = model<User>('User', UserSchema)
