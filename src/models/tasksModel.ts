import TaskType from "@/Types/TaskType";

export const getAllTasks = (): TaskType[] | null => {
    const tasks = localStorage.getItem("tasks");
    return tasks === null ? null : JSON.parse(tasks);
};

export const saveTask = (task: TaskType): void => {

    const tasks = getAllTasks() ?? [];
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

};

export const updateAllTasks = (tasks: TaskType[]): void => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}