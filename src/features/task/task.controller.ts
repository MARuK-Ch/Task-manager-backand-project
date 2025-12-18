import { Request, Response } from "express";
import {TaskService} from "./task.service";
import {Task} from "./task.model";

interface TaskControllerInterface {
    listAll: (_req: Request, res: Response) => Promise<void>
    create: (_req: Request, res: Response) => Promise<void>
    listPending: (_req: Request, res: Response) => Promise<void>
    listDone: (_req: Request, res: Response) => Promise<void>
    updateTitle: (_req: Request, res: Response) => Promise<void>
    updateStatus: (_req: Request, res: Response) => Promise<void>
    delete: (_req: Request, res: Response) => Promise<void>
}


export class TaskController implements TaskControllerInterface{
    constructor(private taskService: TaskService) {}

    //логика обработки данных
    //Возвращаем данные в виде json
    listAll = async (_req: Request, res: Response) => {
        const tasks = await this.taskService.listAll()
        res.json(tasks.map(t => ({ id: t._id, title: t.title, isDone: t.isDone })))
    }

    listPending = async (_req: Request, res: Response) => {
        const tasks = await this.taskService.listPending()
        res.json(tasks.map(t => ({ id: t._id, title: t.title, isDone: t.isDone })))
    }

    listDone = async (_req: Request, res: Response) => {
        const tasks = await this.taskService.listDone()
        res.json(tasks.map(t => ({ id: t._id, title: t.title, isDone: t.isDone })))
    }

    create = async (req: Request, res: Response) => {
        try {
            const newTitle = req.body?.title
            if (!newTitle) {
                res.status(400).json({ message: 'Title is required' })
                return
            }
            const { title, _id, isDone } = await this.taskService.create(newTitle)
            res.status(201).json({id: _id, title, isDone })
        }
        catch (error: Error | any) {
            res.status(400).json({ message: error?.message || 'Error creating task' })
        }
    }

    updateTitle = async (req: Request, res: Response) => {
        try {
            const id = req.params?.id
            const newTitle = req.body?.newTitle
            const updatedTask = await this.taskService.updateTitle(id, newTitle)
            if (updatedTask) {
                res.status(201).json({
                    id: updatedTask._id,
                    title: updatedTask.title,
                    isDone: updatedTask.isDone })
            }
        } catch (error: Error | any) {
            res.status(400).json({ message: error?.message || 'Error updating task title' })
        }
    }

    updateStatus = async (req: Request, res: Response) => {
        try {
            const id = req.params?.id
            const newStatus = req.body?.newStatus
            const updatedTask = await this.taskService.updateStatus(id, newStatus)
            if (updatedTask) {
                res.status(201).json({
                    id: updatedTask._id,
                    title: updatedTask.title,
                    isDone: updatedTask.isDone })
            }
        } catch (error: Error | any) {
            res.status(400).json({ message: error?.message || 'Error updating task status' })
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = req.params?.id
            const isDeleted = await this.taskService.delete(id)
            if (isDeleted) {
                res.status(200).json({ message: 'Task deleted successfully' })
            }
            else {
                res.status(404).json({ message: 'Error deleting task' })
            }
        }
        catch (error: Error | any) {
            res.status(400).json({ message: error?.message || 'Error deleting task' })
        }
    }


}