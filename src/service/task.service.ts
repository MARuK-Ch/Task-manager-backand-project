import { Task, TaskModel } from "../models/task.model.js";

interface TaskServiceInterface {
    listAll: () => Promise<Task[]>
    create: (title: string) => Promise<Task>
    listPending: () => Promise<Task[]>
    listDone: () => Promise<Task[]>
    updateTitle: (id: string, newTitle: string) => Promise<Task | null>
    updateStatus: (id: string, newStatus: boolean) => Promise<Task | null>
    delete: (id: string) => Promise<boolean>
}

//только работа с базой
export class TaskService implements TaskServiceInterface {
    //получаем из базы записи в виде (js objects/arrays)
    listAll(): Promise<Task[]> {
        return TaskModel.find().sort({ updatedAt: -1 }).lean()
    }
    //получаем список активных задач
    listPending(): Promise<Task[]> {
        return TaskModel.find({ isDone: false }).sort({ updateAt: -1 }).lean()
    }
    //получаем список выполненных задач
    listDone(): Promise<Task[]> {
        return TaskModel.find( {isDone: true} ).sort({ updateAt: -1 }).lean()
    }

    async create(title: string): Promise<Task> {
        const createdTask = await TaskModel.create({ title })
        return createdTask.toObject()
    }

    updateTitle(id: string, newTitle: string): Promise<Task | null> {
        if (!newTitle) {
            return Promise.reject(new Error('Требуется новое название задачи'))
        }
        if (!id) {
            return Promise.reject(new Error('требуется указать ID задачи'))
        }

        return TaskModel.findByIdAndUpdate(id, { title: newTitle }, { new: true }).lean()
    }

    updateStatus(id: string, newStatus: boolean): Promise<Task | null> {
        if (typeof newStatus !== 'boolean') {
            return Promise.reject(new Error('Требуется указать новый статус задачи'))
        }
        if (!id) {
            return Promise.reject(new Error('Требуется указать ID задачи'))
        }

        return TaskModel.findByIdAndUpdate(id, { isDone: newStatus }, { new: true }).lean()
    }

    async delete(id: string): Promise<boolean> {
        const res = await TaskModel.findByIdAndDelete(id).lean()
        return Boolean(res) // true если успешно удалено или false если произошла ошибка удаления
    }


}