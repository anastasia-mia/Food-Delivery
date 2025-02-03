import {Server} from "socket.io";
import {addNewMessage, changeReadStatus} from "../queries/chatQueries";
import http, {IncomingMessage} from "http";
import { SessionData } from "express-session";

interface CustomSession extends SessionData {
    user?: { userId: number };
    guestId?: number;
}

interface CustomRequest extends IncomingMessage {
    session: CustomSession;
}

export const setupSocket = (server:  http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("sendMessage", async (messageData) => {
            const newMessage = await addNewMessage(messageData.chatId, messageData.message, messageData.senderId);
            io.to(`chat_${messageData.chatId.toString()}`).emit("newMessage", newMessage);
        })

        socket.on("markMessagesAsRead", async({chatId, senderId}) => {
            await changeReadStatus(chatId, String(senderId));
            io.to(`chat_${chatId.toString()}`).emit("messagesRead");
        })

        socket.on("joinChat", (chatId) => {
            socket.join(`chat_${chatId}`);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`)
        })
    })

    return io;
}