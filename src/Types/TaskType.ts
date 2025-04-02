

export default interface TaskType {
    title: string,
    description: string,
    dueDate: string,
    priority: "hitan" | "vazan" | "bitan" | "nebitan" | null,
}