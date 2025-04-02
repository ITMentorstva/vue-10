import TaskType from "@/Types/TaskType";


export const isIdUsed = (id: string, tasks: TaskType[]): boolean => {
    return tasks.some(task => task.id === id);
}