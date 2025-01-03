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