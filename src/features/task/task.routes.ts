import {Router} from 'express'
import {TaskController} from './task.controller.js'
import {TaskService} from './task.service.js'

const service = new TaskService()
const controller = new TaskController(service)

export const taskRouter = Router();

taskRouter.get('/', controller.listAll) // список задач
taskRouter.post('/', controller.create) // создание новой задачи
taskRouter.get('/pending', controller.listPending) // список задач незавершенные
taskRouter.get('/done', controller.listDone) // список задач завершенные
taskRouter.patch('/:id/title', controller.updateTitle) // Поменять название одной задачи (по id)
taskRouter.patch('/:id/status', controller.updateStatus) // Поменять статус одной задачи (по id)
taskRouter.delete('/:id', controller.delete) // Удалить одну задачу (по id)


// /68f29400814b12f4731bc605/title