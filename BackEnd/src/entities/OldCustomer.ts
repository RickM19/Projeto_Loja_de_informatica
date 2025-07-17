import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('old_customers')
export class OldCustomer {
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
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    deleted_at: Date;
}
