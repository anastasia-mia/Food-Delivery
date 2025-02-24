import {useEffect, useState} from "react";
import { io } from "socket.io-client";
import {IMessage} from "../interfaces/chatInterfaces.ts";
import axiosInstance from "../../axiosConfig.ts";

export const socket = io(import.meta.env.VITE_API_URL, { path: "/socket" });

export const useChat = (chatId?: number) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [requestedChatId, setRequestedChatId] = useState<number | undefined>(chatId);
    const [clientId, setClientId] = useState<string>("");

    useEffect(() => {
        axiosInstance.get(`/messages/${requestedChatId}`).then((res) => {
            setMessages(res.data.messages);
            if(!chatId){
                setRequestedChatId(res.data.chatId);
                setClientId(res.data.senderId);
            }
        })

        if (requestedChatId) {
            socket.emit("joinChat", requestedChatId);
        }

        socket.on("newMessage", (message) => {
            if(message.chat_id === requestedChatId){
                setMessages((prev) => [...prev, message]);
            }
        })

        socket.on("messagesRead", () => {
            setMessages((prev) =>
                prev.map((msg) => msg.is_read === 0 && msg.sender_id !== String(clientId)
                    ? {...msg, is_read: 1}
                    : msg)
            )
        })

        return () => {
            socket.off("newMessage");
            socket.off("messagesRead");
        }
    }, [requestedChatId]);

    const sendMessage = (message: string, senderId?: string) => {
        const messageData = {message,  chatId: requestedChatId, senderId: senderId || clientId};
        socket.emit("sendMessage", messageData);
    }

    const readMessages = (senderId?: string) => {
        if(requestedChatId && clientId || senderId){
            socket.emit("markMessagesAsRead", { chatId: requestedChatId, senderId: senderId || clientId });
        }
    }

    return {messages, sendMessage, requestedChatId, clientId, readMessages}
}