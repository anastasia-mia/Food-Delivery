import {connection} from "../config/database";
import {IRestaurant} from "../models/RestaurantModel";

const getAll = async(): Promise<IRestaurant[] | null> => {
    const sql = `SELECT * FROM restaurants`;
    const [restaurants] = await connection.execute(sql)
    return restaurants as IRestaurant[];
}

const getByLimitAndSorting = async(column: string, limit: number): Promise<IRestaurant[] | null> => {
    const sql= `SELECT * FROM restaurants ORDER BY ${column} DESC LIMIT ${limit}`
    const [restaurants] = await connection.execute(sql)
    return restaurants as IRestaurant[];
}

const getAllCategories = async(): Promise<string[] | null> => {
    const sql = `SELECT DISTINCT category FROM restaurants`;
    const [rows] = await connection.execute(sql);
    if (Array.isArray(rows)) {
        const categories= rows.map((row: any) => row.category) as string[];
        return categories;
    } else {
        console.error('Unexpected result format:', rows);
        return null;
    }
}

export {getAll, getByLimitAndSorting, getAllCategories}