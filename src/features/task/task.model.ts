import { Schema, model } from "mongoose";

//модель данных TS
export interface Task {
    _id: string // поле создается по умолчанию MongoDB
    title: string
    isDone: boolean
    createAt: Date // поле создается по умолчанию MongoDB
    updateAt: Date // поле создается по умолчанию MongoDB
}

//Модель данных в базе
const TaskShema = new Schema<Task>({
    title: { type: String, required: true, trim: true, minLength: 5, maxLength: 200 },
    isDone: { type: Boolean, default: false },
}, { timestamps: true })

export const TaskModel = model<Task>('Task', TaskShema)
