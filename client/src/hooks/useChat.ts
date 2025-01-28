import {useEffect, useState} from "react";
import { io } from "socket.io-client";
import {IMessage} from "../interfaces/chatInterfaces.ts";
import axiosInstance from "../../axiosConfig.ts";

const socket = io("http://localhost:3001");

export const useChat = (chatId?: string) => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        axiosInstance.get(`/messages/${chatId}`).then((res) => {
            setMessages(res.data.messages);
        })

        socket.on("newMessage", (message) => {
            if(message.chat_id === chatId){
                setMessages((prev) => [...prev, message]);
            }
        })

        socket.emit("joinChat", chatId);

        return () => {
            socket.off("newMessage");
        }
    }, [chatId]);

    const sendMessage = (message: string, senderId: string) => {
        const messageData = {message, senderId, chatId};
        socket.emit("sendMessage", messageData);
    }

    return {messages, sendMessage}
}