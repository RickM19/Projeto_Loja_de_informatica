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
        value: number;
        quantity: number;
        subTotal: number;
    }[];
};
