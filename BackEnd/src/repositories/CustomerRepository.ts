import { DataSource } from 'typeorm';
import { Customer } from '@/entities/Customer';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<Customer> {
    constructor(dataSource: DataSource) {
        super(Customer, dataSource.manager);
    }

    async findByEmail(email: string) {
        return this.findOneBy({ email });
    }
    async findByCpf(cpf: string) {
        return this.findOneBy({ cpf });
    }
    async findById(id: string) {
        return this.findOneBy({ id });
    }
}
