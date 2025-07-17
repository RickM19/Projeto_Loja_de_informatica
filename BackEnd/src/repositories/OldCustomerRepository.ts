import { DataSource } from 'typeorm';
import { OldCustomer } from '@/entities/OldCustomer';
import { Repository } from 'typeorm';

export class OldCustomerRepository extends Repository<OldCustomer> {
    constructor(dataSource: DataSource) {
        super(OldCustomer, dataSource.manager);
    }
}
