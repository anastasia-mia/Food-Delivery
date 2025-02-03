import { Request, Response } from "express";
import {
    createNewChat,
    deleteChats,
    getChatId,
    getChats,
    getMessagesByChatId
} from "../queries/chatQueries";

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
        const userId = req.session.user?.userId || null;
        const guestId = req.session.guestId;
        let chatId: number;

        if(req.params.chatId !== undefined && req.params.chatId !== "undefined"){
            chatId = parseInt(req.params.chatId);
        }else{
            chatId =  await getChatId(userId, guestId);
            if(!chatId){
                chatId = await createNewChat(userId, guestId);
            }
        }

        const messages = await getMessagesByChatId(chatId);

        res.status(200).json({chatId, messages, senderId: userId || guestId});
    }catch(error){
        res.status(500).send("Failed to get messages");
    }
}

export const deleteEmptyChats = async(req: Request, res: Response) => {
    try{
        await deleteChats();
        res.status(200).send("Empty chats deleted");
    }catch(error){
        res.status(500).send("Failed to delete empty chats");
    }
}