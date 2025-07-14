import { OrderStatus } from '@/common/enums/OrderStatus';
import { dataSource } from '@/common/typeorm';
import { Order } from '@/entities/Order';
import { CustomerRepository } from '@/repositories/customerRepository';
import { OrderRepository } from '@/repositories/OrderRepository';
import { productRepository } from '@/repositories/productRepository';
import { In } from 'typeorm';

interface IProduct {
    id: string;
    quantity: number;
}

interface ICreateRequest {
    customerId: string;
    products: IProduct[];
}

export class OrderService {
    private orderRepository = new OrderRepository(dataSource);
    private customerRepository = new CustomerRepository(dataSource);
    private prodRepository = productRepository; // Assuming productRepository is defined elsewhere

    async createOrder({
        customerId,
        products,
    }: ICreateRequest): Promise<Order> {
        console.log(products);
        const customer = await this.customerRepository.findById(customerId);
        if (!customer) {
            throw new Error('Cliente não encontrado');
        }

        const productsIds = products.map(p => p.id);
        const existingProducts = await this.prodRepository.find({
            where: { id: In(productsIds) },
        });
        if (!existingProducts.length) {
            throw new Error('Nenhum produto encontrado');
        }

        const existingProductsIds = existingProducts.map(p => p.id);
        const invalidProducts = products.filter(
            p => !existingProductsIds.includes(p.id),
        );
        if (invalidProducts.length) {
            throw new Error(
                `Produtos inválidos: ${invalidProducts.map(p => p.id).join(', ')}`,
            );
        }
        const NoStockProducts = products.filter(
            p =>
                existingProducts.filter(ep => ep.id === p.id)[0].stock <
                p.quantity,
        );
        if (NoStockProducts.length) {
            throw new Error(
                `Produtos sem estoque: ${NoStockProducts.map(p => p.id).join(
                    ', ',
                )}`,
            );
        }

        const productsObjects = products.map(p => {
            const foundProduct = existingProducts.find(ep => ep.id === p.id);
            if (!foundProduct) {
                throw new Error(`Produto com id ${p.id} não encontrado`);
            }
            const productRef = this.prodRepository.create({
                id: foundProduct.id,
            });
            return {
                product: productRef, // ENTIDADE COMPLETA
                quantity: p.quantity,
                price: foundProduct.value,
            };
        });

        const total_amount = Number(
            productsObjects
                .reduce((acc, p) => acc + Number(p.price) * p.quantity, 0)
                .toFixed(2),
        );

        const order = await this.orderRepository.createOrder({
            customer,
            products: productsObjects,
            total_amount,
        });

        const orderProducts = order.products;
        const newStock = orderProducts.map(op => ({
            id: op.product.id,
            stock:
                existingProducts.filter(ep => ep.id === op.product.id)[0]
                    .stock - op.quantity,
        }));

        await this.prodRepository.save(newStock);
        return order;
    }

    async checkoutOrder(orderId: string): Promise<Order> {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new Error('Pedido não encontrado');
        }

        if (order.status === 'FINALIZADO') {
            throw new Error('Pedido já finalizado');
        }

        order.status = OrderStatus._FINALIZADO;
        await this.orderRepository.save(order);
        return order;
    }

    async getOrderById(id: string): Promise<Order> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new Error('Pedido não encontrado');
        }
        return order;
    }

    async deleteOrder(id: string): Promise<void> {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new Error('Pedido não encontrado');
        }
        if (order.status === OrderStatus._FINALIZADO) {
            throw new Error('Pedido finalizado não pode ser excluído');
        }
        await this.orderRepository.remove(order);

        const productsIds = order.products.map(p => p.product.id);
        const products = await this.prodRepository.find({
            where: { id: In(productsIds) },
        });
        const updatedStock = products.map(product => {
            const orderProduct = order.products.find(
                op => op.product.id === product.id,
            );
            if (orderProduct) {
                return {
                    ...product,
                    stock: product.stock + orderProduct.quantity,
                };
            }
            return product;
        });
        await this.prodRepository.save(updatedStock);
    }
    async getAllOrders(): Promise<Order[]> {
        return this.orderRepository.find({
            relations: ['customer', 'products'],
        });
    }
}
