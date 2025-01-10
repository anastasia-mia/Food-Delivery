export interface IRestaurant{
    id?: number;
    name: string;
    deliveryPriceFrom: number,
    deliveryPriceTo: number,
    deliveryTimeFrom: number,
    deliveryTimeTo: number,
    ranking: number,
    type: string,
    imagePath: string,
    logoPath: string
}

export interface IRestaurantType {
    id: number,
    name: string
}

export interface IRestaurantObject{
    restaurant_id: number,
    restaurantName: string,
}



