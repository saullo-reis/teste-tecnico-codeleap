interface PostsType {
    content: string,
    created_datetime: string,
    id: number,
    title: string,
    username: string
}

interface DataType {
    title?: string,
    name?: string,
    content?: string,
}

export type { DataType, PostsType}