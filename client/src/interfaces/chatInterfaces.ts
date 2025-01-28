export interface IChat{
    id: number,
    updatedAt: string,
    lastMessage: string,
    name: string,
    unreadCount: number
}

export interface IMessage{
    id: number,
    chat_id: number,
    sender_id: string,
    message: string,
    created_at: string,
    is_read: number
}