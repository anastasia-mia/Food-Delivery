import {useEffect, useState} from "react";
import { io } from "socket.io-client";
import {IMessage} from "../interfaces/chatInterfaces.ts";
import axiosInstance from "../../axiosConfig.ts";

const socket = io("http://localhost:3001");

export const useChat = (chatId?: string) => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [requestedChatId, setRequestedChatId] = useState<string | undefined>(chatId);
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
            if(String(message.chat_id) === String(requestedChatId)){
                setMessages((prev) => [...prev, message]);
            }
        })

        return () => {
            socket.off("newMessage");
        }
    }, [requestedChatId]);

    const sendMessage = (message: string, senderId?: string) => {
        const messageData = {message,  chatId: requestedChatId, senderId: senderId || clientId};
        socket.emit("sendMessage", messageData);
    }

    return {messages, sendMessage}
}