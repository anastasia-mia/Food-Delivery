import {connection} from "../config/database";
import {IRestaurant} from "../models/RestaurantModel";

const getAll = async(): Promise<IRestaurant[] | null> => {
    const sql = `SELECT * FROM restaurants`;
    const [restaurants] = await connection.execute(sql)
    return restaurants as IRestaurant[];

}

export {getAll}