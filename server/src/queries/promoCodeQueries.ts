import connection from "../config/database";
import {RowDataPacket} from "mysql2";
import {IPromoCode} from "../models/promoCodeModel";

export const addPromoCode = async({code, discount, startDate, endDate} : IPromoCode): Promise<void> => {
    const sql = `INSERT INTO promo_codes (code, discount,start_date, end_date) VALUES (?, ?, ?, ?)`;
    await connection.execute(sql, [code, discount, startDate, endDate])
}

export const getPromoCode = async(code: string) => {
    const sql = `SELECT * FROM  promo_codes WHERE code = ?`;
    const [rows] = await connection.execute<RowDataPacket[]>(sql, [code]);
    if(rows.length >= 0){
        return rows[0];
    }
    return null;
}

export const getEndDate = async(code: string): Promise<Date | null> => {
    const sql = `SELECT end_date FROM promo_codes WHERE code = ?`;
    const [rows] = await connection.execute<RowDataPacket[]>(sql, [code]);
    if(rows.length >= 0){
        return new Date(rows[0].end_date);
    }
    return null;
}