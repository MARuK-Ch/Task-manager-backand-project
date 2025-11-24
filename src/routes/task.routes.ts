import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import {TaskService} from "../service/task.service";

const service = new TaskService()
const controller = new TaskController(service)

export const taskRouter = Router();

taskRouter.get('/', controller.listAll) //получить весь список задач
taskRouter.post('/create', controller.create) //создание новой задачи
taskRouter.get('/pending', controller.listPending) //список активных задач
taskRouter.get('/done', controller.listDone) //список выполненных задач
taskRouter.patch('/:id/title', controller.updateTitle) //Поменять текст задачи
taskRouter.patch('/:id/status', controller.updateStatus) //Поменять статус задачи по ID
taskRouter.delete('/:id', controller.delete) //Удалить задачу по ID