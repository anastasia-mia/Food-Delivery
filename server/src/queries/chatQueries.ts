import connection from "../config/database";
import {OkPacket} from "mysql2";


export const getChatId = async(userId: number, guestId: string) => {
    const sql = 'SELECT id FROM chats WHERE user_id = ? OR guest_id = ?';
    const [rows] = await connection.execute(sql, [userId, guestId]);
    if(rows[0]){
        return rows[0].id
    }else{
        return null
    }
}

export const createNewChat = async(userId: number | null, guestId: string) => {
    const sql = 'INSERT INTO chats (user_id, guest_id) VALUES (?, ?)';
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
             AND messages.is_read = 0 AND messages.sender_id != ?) AS unreadCount
        FROM chats c
            LEFT JOIN users u ON u.id = c.user_id
        ORDER BY c.updated_at DESC
            LIMIT 9 OFFSET ?
    `;

    const offset = (page - 1) * 9;
    const [rows] = await connection.query(sql, ['admin', offset]);

    const countSql = `SELECT COUNT(DISTINCT c.id) AS total FROM chats c`;
    const [countRows] = await connection.execute(countSql);

    return {chats: rows, hasNextPage: countRows[0].total > offset + 9};
}

export const getMessagesByChatId = async(chatId: number) => {
    const sql = `SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC`;
    const [rows] = await connection.query(sql, [chatId]);
    return rows;
}

export const addNewMessage = async(chatId: number, message: string, userId: string) => {
    const sqlInsertMessage = 'INSERT INTO messages (chat_id, message, is_read, sender_id) VALUES (?, ?, ?, ?)';
    const [result] = await connection.execute<OkPacket>(sqlInsertMessage, [chatId, message, false, userId]);

    const sqlUpdateChat = 'UPDATE chats SET updated_at = NOW() WHERE id = ?';
    await connection.execute(sqlUpdateChat, [chatId]);

    return {
        id: result.insertId,
        chat_id: chatId,
        sender_id: userId,
        message,
        is_read: 0,
        created_at: new Date().toISOString()
    };
}

export const changeReadStatus = async(chatId: number, senderId: string) => {
    const sql = 'UPDATE messages SET is_read = true WHERE chat_id = ? AND sender_id != ?';
    await connection.execute(sql, [chatId, senderId]);
}

export const deleteChats = async() => {
    const sql = 'DELETE c FROM chats c LEFT JOIN messages m ON c.id = m.chat_id WHERE m.id IS NULL';
    await connection.execute(sql);
}