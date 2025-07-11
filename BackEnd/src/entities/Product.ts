import { Column, Double, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text'})
    imgUrl: string;

    @Column({type: 'text'})
    code: string;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'text'})
    description: string;

    @Column({type: 'numeric'})
    value: Double;
    
    @Column({type: 'int'})
    stock: number;
}