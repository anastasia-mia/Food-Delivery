import {connection} from "../config/database";
import {IMenuItem} from "../models/menuModel";

const getAllItems = async(restaurantId: number): Promise<IMenuItem[]> => {
    const sql = `SELECT * FROM menu_items where restaurant_id  = ?`;
    const [rows] = await connection.execute(sql, [restaurantId]);
    return rows as IMenuItem[];
}

const getAllByCategory = async(restaurantId: number, category: string): Promise<IMenuItem[] | null> => {
    const sql =  `SELECT * FROM menu_items WHERE restaurant_id  = ? AND category = ?`;
    const [rows] = await connection.execute(sql, [restaurantId, category]);
    return rows as IMenuItem[];
}

const getAllCategories = async(restaurantId: number): Promise<string[] | null>  => {
    const sql = `SELECT DISTINCT category FROM menu_items WHERE restaurant_id = ?`;
    const [rows] = await connection.execute(sql, [restaurantId]);
    if (Array.isArray(rows)) {
        const categories = rows.map((row: any) => row.category);
        return categories as string[];
    }else{
        return null;
    }
}

export {getAllByCategory, getAllCategories, getAllItems};