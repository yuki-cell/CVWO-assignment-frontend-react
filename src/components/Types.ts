export type Task = {
    id: number
    name: string
    done: boolean
    tags: Tag[]
}

export type Tag = {
  name: string
}
