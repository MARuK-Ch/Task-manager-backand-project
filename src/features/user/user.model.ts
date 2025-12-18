import { Schema, model } from "mongoose";

export interface User {
    _id: string // поле создается по умолчанию MongoDB
    email: string
    password: string
    name: string
    createAt: Date // поле создается по умолчанию MongoDB
    updateAt: Date // поле создается по умолчанию MongoDB
}

const UserSchema = new Schema<User>({
    email: { type: String, required: true, trim: true, minLength: 5, maxLength: 200 },
    password: { type: String, required: true, trim: true, minLength: 8, maxLength: 200 },
    name: { type: String, trim: true, minLength: 5, maxLength: 200 },
}, { timestamps: true })

export const UserModel = model<User>('User', UserSchema)
