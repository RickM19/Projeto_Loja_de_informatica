import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    name: string;
    @Column({ type: 'text' })
    phone: string;
    @Column({ type: 'text', unique: true })
    cpf: string;
    @Column({ type: 'text', nullable: true })
    address?: string;
}
