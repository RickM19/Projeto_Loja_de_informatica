import { CustomerService } from '@/services/CustomerService';
import { Request, Response } from 'express';

export class CustomerController {
    private service = new CustomerService();

    async create(req: Request, res: Response) {
        const response = await this.service.createCustomer(req.body);
        res.status(201).json(response);
    }

    async getById(req: Request, res: Response) {
        const customer = await this.service.getById(req.params?.id);
        res.status(200).json(customer);
    }

    async getFiltered(req: Request, res: Response) {
        const customers = await this.service.getByParams(req.query);
        res.status(200).json(customers);
    }

    async update(req: Request, res: Response) {
        const response = await this.service.update(req.params?.id, req.body);
        res.status(200).json(response);
    }

    async delete(req: Request, res: Response) {
        await this.service.delete(req.params?.id);
        res.status(204).send();
    }
    async getbyCpf(req: Request, res: Response) {
        const customer = await this.service.findByCpf(req.params?.cpf);
        res.status(200).json(customer);
    }
}
