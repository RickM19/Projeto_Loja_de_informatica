import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrdersProduct } from './OrdersProduct';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    code: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'numeric' })
    value: number;

    @Column({ type: 'int' })
    stock: number;
}
