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
    customer: {name: string, email: string},
    orderItems: IOrderMenuItem[]
}

export interface IStatus{
    id: number,
    name: string
}

export interface ClientDetails{
    name: string,
    surName: string,
    email: string;
    phoneNumber: string;
    comment?: string;
}