export type Task = {
    id: number
    parent_task_id: number
    name: string
    completed: boolean
    tags: Tag[]
    sub_tasks: Task[]
}

export type Tag = {
  name: string
}
