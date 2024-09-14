export interface Customer{
    user_id: number,
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
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