export interface IRestaurant{
    id?: number;
    name: string;
    delivery_price_from: number,
    delivery_price_to: number,
    delivery_time_from: number,
    delivery_time_to: number,
    ranking: number,
    category: string
}