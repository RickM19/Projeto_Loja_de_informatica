import { Request, Response } from "express";
import { UserService } from "@/services/UserService";

export class UserController {

    private service = new UserService();

    async create(req: Request, res: Response) {
        await this.service.create(req.body);
        res.status(201).send();
    }

    async login(req: Request, res: Response) {
        const result = await this.service.login(req.body);
        res.status(200).json(result);
    }

    async getProfile(req: Request, res: Response) {
        res.status(200).json(req.user);
    }

    async update(req: Request, res: Response) {
        let response = await this.service.update(req.body, req.user);
        res.status(204).json(response);
    }

    async delete(req: Request, res: Response) {
        await this.service.delete(req.params?.id);
        res.status(204).send();
    }
}