import express from 'express';
import {deleteEmptyChats, getAllChats, getMessages} from "../controllers/chatController";

const router = express.Router();

router.get("/chats", getAllChats);
router.get("/messages/:chatId", getMessages);
router.delete("/delete/chats", deleteEmptyChats);

export default router;