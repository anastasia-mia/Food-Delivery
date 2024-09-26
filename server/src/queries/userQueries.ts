import connection from '../config/database';
import {IUser} from "../models/UserModel";
import {RowDataPacket} from "mysql2";

const addUser = async (user: IUser): Promise<void> => {
    const sql = `INSERT INTO users (name,password,email) VALUES (?,?,?)`;
    await connection.execute(sql, [user.name, user.password, user.email]);
}

const getUserByEmail = async (email: string): Promise<IUser | null> => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [rows] = await connection.execute<RowDataPacket[]>(sql, [email]);
    if (rows.length > 0) {
        return rows[0] as IUser;
    }
    return null;
}

export {addUser, getUserByEmail};