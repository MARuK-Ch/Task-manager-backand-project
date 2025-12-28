import { Schema, model } from 'mongoose'

// модель данных ts
export interface Task {
  _id: string // по умолчанию
  title: string
  isDone: boolean
  createAt: Date // по умолчанию
  updateAt: Date // по умолчанию
}

const TaskSchema = new Schema<Task>({
  title: { type: String, required: true, trim: true, minLength: 3, maxLength: 200 },
  isDone: { type: Boolean, default: false },
}, { timestamps: true })

// модель данных в базе
export const TaskModel = model<Task>('Task', TaskSchema)
