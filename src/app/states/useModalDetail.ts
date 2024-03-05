import { create } from 'zustand'
import { Task } from '../models/Task'

interface DetailTaskStateModal<T>{
    body?: T;
    visible: boolean;
    openModal: (task: Task) => void;
    closeModal: ()=>void
}

export const useTaskModal = create<DetailTaskStateModal<Task | null>>((set) => ({
    visible: false,
    openModal: (body: Task) => (set({body, visible: true})),
    closeModal: ()=> (set({body: null, visible: false}))
}))
