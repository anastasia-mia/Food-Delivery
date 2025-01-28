import connection from "../config/database";
import {OkPacket} from "mysql2";


export const getChatId = async(userId: number, guestId: string) => {
    const sql = 'SELECT id FROM chats WHERE user_id = ? OR guest_id = ?';
    const [rows] = await connection.execute(sql, [userId, guestId]);
    return rows[0].id;
}

export const createNewChat = async(userId: number, guestId: string) => {
    const sql = 'INSERT INTO chats (userId, guestId) VALUES (?, ?)';
    const [result] = await connection.execute<OkPacket>(sql, [userId, guestId]);
    return result.insertId;
}

export const getChats = async(page: number) => {
    const sql = `
        SELECT
            c.id,
            c.updated_at AS updatedAt,
            (SELECT m.message
             FROM messages m
             WHERE m.chat_id = c.id
             ORDER BY m.id DESC LIMIT 1) AS lastMessage,
            u.name,
            (SELECT COUNT(*) 
             FROM messages 
             WHERE messages.chat_id = c.id 
             AND messages.is_read = 0) AS unreadCount
        FROM chats c
            LEFT JOIN users u ON u.id = c.user_id
        ORDER BY c.updated_at DESC
            LIMIT 8 OFFSET ?
    `;

    const offset = (page - 1) * 8;
    const [rows] = await connection.query(sql, [offset]);

    const countSql = `SELECT COUNT(DISTINCT c.id) AS total FROM chats c`;
    const [countRows] = await connection.execute(countSql);

    return {chats: rows, hasNextPage: countRows[0].total > offset + 8};
}

export const getMessagesByChatId = async(chatId: number) => {
    const sql = `SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC`;
    const [rows] = await connection.query(sql, [chatId]);
    return rows;
}

export const addNewMessage = async(chatId: number, message: string, userId: string) => {
    const sql = 'INSERT INTO messages (chat_id, message, is_read, sender_id) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute<OkPacket>(sql, [chatId, message, false, userId]);
    return {
        id: result.insertId,
        chat_id: chatId,
        sender_id: userId,
        message,
        is_read: false,
        created_at: new Date().toISOString()
    };
}

export const changeReadStatus = async(chatId: number, senderId: string) => {
    const sql = 'UPDATE messages SET is_read = true WHERE chat_id = ? AND sender_id = ?';
    await connection.execute(sql, [chatId, senderId]);
}