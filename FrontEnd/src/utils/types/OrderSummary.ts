export type OrderSummary = {
    order_id: string;

    customer_name: string;

    customer_phone: string;

    customer_cpf: string;

    customer_address: string;

    total_amount: string;

    products: {
    name: string;
    code: string;
    value: string;
    quantity: number;
    price: string;
    }[];
}