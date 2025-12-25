import {Task, TaskModel} from './task.model.js'

interface TaskServiceInterface {
    listAll: () => Promise<Task[]>
    create: (title: string) => Promise<Task>
    listPending: () => Promise<Task[]>
    listDone: () => Promise<Task[]>
    updateTitle: (id: string, newTitle: string) => Promise<Task | null>
    updateStatus: (id: string, newStatus: boolean) => Promise<Task | null>
    delete: (id: string) => Promise<boolean>
}

// эксклюзивно работа с базой
export class TaskService implements TaskServiceInterface {
    // получаем из базы записи (js objects/arrays)
    listAll(): Promise<Task[]> { // готовка блюда
        // SELECT FROM Task -> sql
        return TaskModel.find().sort({ updatedAt: -1 }).lean()
    }

    listPending(): Promise<Task[]> {
        return TaskModel.find({ isDone: false }).sort({ updatedAt: -1 }).lean()
    }

    listDone(): Promise<Task[]> {
        return TaskModel.find({ isDone: true }).sort({ updatedAt: -1 }).lean()
    }

    async create(title: string): Promise<Task> {
        const createdTask = await TaskModel.create({ title })
        return createdTask.toObject()
    }

    updateTitle(id: string, newTitle: string): Promise<Task | null> {
        if (!id) {
            return Promise.reject(new Error('Требуется id задачи'))
        }
        if (!newTitle) {
            return Promise.reject(new Error('Требуется новое название задачи'))
        }

        return TaskModel.findByIdAndUpdate(id, { title: newTitle }, { new: true }).lean()
    }

    updateStatus(id: string, newStatus: boolean): Promise<Task | null> {
        if (!id) {
            return Promise.reject(new Error('Требуется id задачи'))
        }
        if (typeof newStatus !== 'boolean') {
            return Promise.reject(new Error('Требуется новый статус задачи'))
        }

        return TaskModel.findByIdAndUpdate(id, { isDone: newStatus }, { new: true }).lean()
    }

    async delete(id: string): Promise<boolean> {
        const res = await TaskModel.findByIdAndDelete(id).lean()
        return Boolean(res) // true - если успешно удалена or false - если произошла ошибка
    }
}
