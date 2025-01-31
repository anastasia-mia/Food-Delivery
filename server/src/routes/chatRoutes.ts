import express from 'express';
import {getAllChats, getMessages, markMessagesAsRead} from "../controllers/chatController";

const router = express.Router();

router.get("/chats", getAllChats);
router.get("/messages/:chatId", getMessages);
router.patch("messages/read", markMessagesAsRead);

export default router;