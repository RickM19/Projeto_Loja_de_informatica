import { Customer } from '@/entities/Customer';
import { Order } from '@/entities/Order';
import { DataSource, Repository } from 'typeorm';

interface IProduct {
    id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];
    totalAmount: number; // Optional, will be calculated if not provided
}

export class OrderRepository extends Repository<Order> {
    constructor(dataSource: DataSource) {
        super(Order, dataSource.manager);
    }

    async findById(id: string): Promise<Order | null> {
        return this.findOne({
            where: { id },
            relations: ['customer', 'products'],
        });
    }

    async createOrder({
        customer,
        products,
        totalAmount,
    }: IRequest): Promise<Order> {
        const order = this.create({
            customer,
            products: products,
            totalAmount: totalAmount,
        });

        await this.save(order);
        return order;
    }
}
