import { DataSource } from 'typeorm';
import { Customer } from '@/entities/Customer';
import { Repository } from 'typeorm';

export class CustomerRepository extends Repository<Customer> {
    constructor(dataSource: DataSource) {
        super(Customer, dataSource.manager);
    }
    async findByCpf(cpf: string) {
        return this.findOneBy({ cpf });
    }
    async findById(id: string) {
        return this.findOneBy({ id });
    }
}
