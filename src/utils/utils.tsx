import { ReactNode } from "react"


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

interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode
}

export type { DataType, PostsType, ModalProps}