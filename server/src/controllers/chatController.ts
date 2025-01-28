import { Request, Response } from "express";
import {
    changeReadStatus,
    createNewChat,
    getChatId,
    getChats,
    getMessagesByChatId
} from "../queries/chatQueries";

export const getChat = async(req: Request, res: Response) => {
    try{
        const userId = req.session.user.userId || null;
        const guestId = req.session.guestId;

        const chatId =  await getChatId(userId, guestId);

        if(chatId){
            return res.status(200).json({chatId})
        }else{
            let newChatId = await createNewChat(userId, guestId);
            return res.status(201).json({ chatId: newChatId });
        }
    }catch(error){
        res.status(500).send("Failed to get chat")
    }
}

export const getAllChats = async(req: Request, res: Response) => {
    try{
        const page: number = parseInt(req.query.page as string, 10) || 1;

        const chatsData = await getChats(page);
        return res.status(200).json({chats: chatsData.chats, hasNextPage: chatsData.hasNextPage});
    }catch(error){
        res.status(500).send("Failed to get all chats")
    }
}

export const getMessages = async(req: Request, res: Response) => {
    try{
        const chatId: number = parseInt(req.params.chatId);
        const messages = await getMessagesByChatId(chatId);

        res.status(200).json({messages})
    }catch(error){
        res.status(500).send("Failed to get messages");
    }
}

export const markMessagesAsRead = async(req: Request, res: Response) => {
    try{
        const {chatId, senderId} = req.body;
        const userId = req.session.user.userId || null;
        const guestId = req.session.guestId;

        await changeReadStatus(chatId, senderId ? senderId : userId ? userId : guestId);

        res.status(200).send("Messages as read");
    }catch(error){
        res.status(500).send("Error to read the message");
    }
}