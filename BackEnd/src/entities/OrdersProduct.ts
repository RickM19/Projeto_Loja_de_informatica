import {
    Column,
    Double,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';

@Entity('orders_product')
export class OrdersProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.products, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product, p => p.orderProducts)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    product_id: string;

    order_id: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: Double;
    @Column({ type: 'int' })
    quantity: number;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
