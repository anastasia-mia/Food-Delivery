export interface Customer{
    user_id: number,
    name: string;
    surName: string;
    email: string;
    phoneNumber: string;
    address: string;
    comment: string;
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
}

export interface Order {
    total: number;
    status: string;
    order_date: string;
    customer: Customer;
    orderItems: OrderItem[];
}