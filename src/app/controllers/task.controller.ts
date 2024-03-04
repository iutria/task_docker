import { Response, getTasks } from "../repository/task.repository";


export const getTasksController = async (set: any, _: any) => {
    const response: Response = await getTasks();
    set({list: response.data});
}