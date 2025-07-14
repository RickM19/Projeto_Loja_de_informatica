import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from './Customer';
import { OrderStatus } from '@/common/enums/OrderStatus';
import { OrdersProduct } from './OrdersProduct';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @OneToMany(() => OrdersProduct, ordersProduct => ordersProduct.order, {
        cascade: true,
    })
    products: OrdersProduct[];

    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn()
    updated_at: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalAmount: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus._PENDENTE })
    status: OrderStatus;
}
