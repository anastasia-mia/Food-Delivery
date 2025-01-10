import connection from "../config/database";
import {IRestaurant, IRestaurantType} from "../models/RestaurantModel";

const restaurantSelectFields = `
    r.id, r.name, r.ranking, r.img_path AS imagePath, r.logo_path AS logoPath,
     rt.name as type, 
    dt.delivery_time_from AS deliveryTimeFrom, dt.delivery_time_to AS deliveryTimeTo, 
    dp.delivery_price_from AS deliveryPriceFrom, dp.delivery_price_to AS deliveryPriceTo
`;

const getAll = async(): Promise<IRestaurant[] | null> => {
    const sql = `SELECT  ${restaurantSelectFields}
        FROM restaurants r
        JOIN restaurant_types rt ON r.type_id = rt.id
        JOIN delivery_time dt ON r.delivery_time_id = dt.id
        JOIN delivery_price dp ON r.delivery_price_id = dp.id
        `;
    const [restaurants] = await connection.execute(sql)
    return restaurants as IRestaurant[];
}

const getIdByName = async (name: string): Promise<number | null> => {
    const sql = `SELECT id FROM restaurants WHERE name = ?`;
    const [rows] = await connection.execute(sql, [name]);
    return rows[0].id;
}

const getById = async (id: string): Promise<IRestaurant | null> => {
    const sql = `SELECT ${restaurantSelectFields}
                 FROM restaurants r
                          JOIN restaurant_types rt ON r.type_id = rt.id
                          JOIN delivery_time dt ON r.delivery_time_id = dt.id
                          JOIN delivery_price dp ON r.delivery_price_id = dp.id
                    WHERE r.id = ?
    `;
    const [rows] = await connection.execute(sql, [id]);
    const restaurants = rows as IRestaurant[];
    return restaurants.length ? restaurants[0] : null;
}

const getByLimitAndSorting = async(limit: number, offset: number): Promise<IRestaurant[] | null> => {
    const sql = `SELECT ${restaurantSelectFields}
                 FROM restaurants r
                          JOIN restaurant_types rt ON r.type_id = rt.id
                          JOIN delivery_time dt ON r.delivery_time_id = dt.id
                          JOIN delivery_price dp ON r.delivery_price_id = dp.id
                     LIMIT ${limit} OFFSET ${offset}
    `;
    const [restaurants] = await connection.execute(sql)
    return restaurants as IRestaurant[];
}

const getAllRestaurantTypes = async(): Promise<IRestaurantType[] | null> => {
    const sql = `SELECT * FROM restaurant_types`;
    const [categories] = await connection.execute(sql);
    return categories as IRestaurantType[];
}

const getRestaurantsNamesByCategory = async(id: number) :Promise<string[]> => {
    const sql = `SELECT name FROM restaurants where type_id = ?`;
    const [rows] = await connection.execute(sql, [id]);

    return (rows as {name: string}[]).map(row => row.name);
}

export {getAll, getById, getByLimitAndSorting, getAllRestaurantTypes, getIdByName, getRestaurantsNamesByCategory}