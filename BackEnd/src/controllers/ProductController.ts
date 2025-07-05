import { ProductService } from "@/services/ProductService";
import { Request, Response } from "express";

export class ProductController {
    
    private service = new ProductService()

    async create(req: Request, res: Response) {

        await this.service.create(req.body);

        res.status(201).send()
    }

    async getById(req: Request, res: Response) {
        const product = await this.service.getById(req.params?.id);
        res.status(200).json(product);
    }

    async getFiltered(req: Request, res: Response) {
        const products = await this.service.getByParams(req.query);
        res.status(200).json(products);
    }

    async update(req: Request, res: Response) {
        await this.service.update(req.params?.id, req.body);

        res.status(204).send();
    }

    async delete(req: Request, res: Response) {
        await this.service.delete(req.params?.id);

        res.status(204).send();
    }

}