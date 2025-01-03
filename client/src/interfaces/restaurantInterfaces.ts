export interface IRestaurant{
    id?: number;
    name: string;
    delivery_price_from: number,
    delivery_price_to: number,
    delivery_time_from: number,
    delivery_time_to: number,
    ranking: number,
    type: string
}

export interface IRestaurantType {
    id: number,
    name: string
}

export interface IRestaurantObject{
    restaurant_id: number,
    restaurantName: string,
}



