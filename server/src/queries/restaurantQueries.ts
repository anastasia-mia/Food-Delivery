import connection from "../config/database";
import {IRestaurant} from "../models/RestaurantModel";

const getAll = async(): Promise<IRestaurant[] | null> => {
    const sql = `SELECT * FROM restaurants`;
    const [restaurants] = await connection.execute(sql)
    return restaurants as IRestaurant[];
}

const getIdByName = async (name: string): Promise<number | null> => {
    const sql = `SELECT id FROM restaurants WHERE name = ?`;
    const [rows] = await connection.execute(sql, [name]);
    return rows[0].id;
}

const getById = async (id: string): Promise<IRestaurant | null> => {
    const sql = `SELECT * FROM restaurants WHERE id = ?`;
    const [rows] = await connection.execute(sql, [id]);
    const restaurants = rows as IRestaurant[];
    return restaurants.length ? restaurants[0] : null;
}

const getByLimitAndSorting = async(limit: number, offset: number): Promise<IRestaurant[] | null> => {
    const sql= `SELECT * FROM restaurants LIMIT ${limit} OFFSET ${offset}`
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

export {getAll, getById, getByLimitAndSorting, getAllCategories, getIdByName}