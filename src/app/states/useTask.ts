import { create } from 'zustand'
import { Task } from '../models/Task'
import { getTasksController } from '../controllers/task.controller';

interface TaskStateModel{
    list: Task[];
    getTasks: ()=>void
}

export const useTask = create<TaskStateModel>((set, get) => ({
    list: [] ,
    getTasks: ()=>getTasksController(set, get)
}))
