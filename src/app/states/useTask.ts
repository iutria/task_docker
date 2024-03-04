import { create } from 'zustand'
import { Task } from '../models/Task'
import { getTasksController } from '../controllers/task.controller';

interface TaskStateModel{
    list: Task[];
    task: Task;
    setTask: (task: Task) => void
    getTasks: ()=>void
}

export const useTask = create<TaskStateModel>((set, get) => ({
    task: {id: '',title: '',description: '',color: ''},   
    list: [] ,
    setTask: (task: Task) => (set({task})),
    getTasks: ()=>getTasksController(set, get)
}))
