import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ex_users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text'})
    name: string;

    @Column({type: 'text', unique: true})
    email: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    deleted_at: Date;
}