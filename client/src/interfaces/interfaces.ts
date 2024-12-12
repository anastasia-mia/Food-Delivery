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

export interface IMenuItem{
    id?: number,
    name: string,
    description: string,
    price: number,
    category: string,
    restaurant_id?: number
}

export interface ICartItem{
    id?: number;
    quantity: number;
    name: string;
    price: number;
    restaurant_id?: number;
    menuItemName?: string;
}

export interface IRestaurantObject{
    restaurant_id: number,
    restaurantName: string,
}

export interface ClientDetails{
    name: string,
    surName: string,
    email: string;
    phoneNumber: string;
    comment?: string;
}

export interface IOrderMenuItem{
    menuItemId: number,
    menuItemName: string,
    quantity: number,
    price: number
}

export interface IOrder{
    orderId: number,
    total: number,
    orderDate: string,
    status: {
        statusId: number,
        statusName: string
    }
    restaurantName: string,
    comment: string,
    customer: object,
    orderItems: IOrderMenuItem[]
}