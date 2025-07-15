import { AppError, BadRequestError } from '@/common/errors/AppError';
import { customerSchema } from '@/common/http/schemas/CustomerSchema';
import { dataSource } from '@/common/typeorm';
import { Customer } from '@/entities/Customer';
import { OldCustomer } from '@/entities/OldCustomer';
import { CustomerRepository } from '@/repositories/customerRepository';
import { OldCustomerRepository } from '@/repositories/OldCustomerRepository';
import { z } from 'zod';

interface IBasicRespone {
    message: string;
}

export class CustomerService {
    private customerRepository = new CustomerRepository(dataSource);
    private oldCustomerRepository = new OldCustomerRepository(dataSource);

    async createCustomer(
        customerData: Partial<Customer>,
    ): Promise<IBasicRespone> {
        const _Customer = customerSchema.safeParse(customerData);
        if (!_Customer.success) {
            throw new BadRequestError('Nome e CPF são obrigatórios!');
        }
        const { name, phone, cpf, address } = _Customer.data;
        const existingCustomer = await this.customerRepository.findByCpf(cpf);
        if (existingCustomer) {
            throw new BadRequestError('Cliente com este CPF já existe!');
        }
        const newCustomer = this.customerRepository.create({
            name,
            phone,
            cpf,
            address,
        });
        await this.customerRepository.save(newCustomer);
        return {
            message: 'Cliente cadastrado com sucesso!',
        };
    }

    async getById(id: string): Promise<Customer> {
        const _id = z.string().uuid().safeParse(id);
        if (!_id.success) {
            throw new BadRequestError('Id inválido');
        }

        const customer = await this.customerRepository.findById(id);
        if (!customer) {
            throw new BadRequestError('Cliente não encontrado!');
        }
        return customer;
    }
    async getByParams(args: Partial<Customer>): Promise<Customer[]> {
        const { cpf, name, phone } = args;
        let result = await this.customerRepository.find();
        if (cpf) result = result.filter(customer => customer.cpf === cpf);

        if (name) result = result.filter(customer => customer.name === name);

        if (phone) result = result.filter(customer => customer.phone === phone);

        return result;
    }

    async update(id: string, args: Partial<Customer>): Promise<IBasicRespone> {
        const _id = z.string().uuid().safeParse(id);
        if (!_id.success) {
            throw new BadRequestError('Id inválido!');
        }

        const updated = customerSchema.partial().safeParse(args);
        if (!updated.success) {
            throw new BadRequestError('Dados inválidos!');
        }

        const existingCustomer = await this.customerRepository.findById(id);
        if (!existingCustomer) {
            throw new BadRequestError('Cliente não cadastrado!');
        }

        const updatedCustomer = this.customerRepository.merge(
            existingCustomer,
            updated.data,
        );
        await this.customerRepository.save(updatedCustomer);

        return {
            message: 'Cliente atualizado com sucesso!',
        };
    }

    async delete(id: string): Promise<IBasicRespone> {
        const _id = z.string().uuid().safeParse(id);
        if (!_id.success) {
            throw new BadRequestError('Id inválido!');
        }

        const existingCustomer = await this.customerRepository.findById(id);
        if (!existingCustomer) {
            throw new BadRequestError('Cliente não cadastrado!');
        }

        await this.customerRepository.remove(existingCustomer);

        return {
            message: 'Cliente deletado com sucesso!',
        };
    }
    async findByCpf(cpf: string): Promise<Customer | null> {
        const _cpf = z.string().length(11).safeParse(cpf);
        if (!_cpf.success) {
            throw new BadRequestError('CPF inválido!');
        }
        const existingCustomer = await this.customerRepository.findByCpf(cpf);
        if (!existingCustomer) {
            throw new AppError('Cliente não encontrado!', 404);
        }
        return existingCustomer;
    }

    async getOldCustomers(): Promise<OldCustomer[] | null> {
        const result = await this.oldCustomerRepository.find();

        return result;
    }
}
