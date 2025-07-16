import { OrderService } from '@/services/OrderService';
import { Request, Response } from 'express';

export class OrderController {
    private orderService = new OrderService();

    create = async (req: Request, res: Response) => {
        const response = await this.orderService.createOrder(req.body);
        res.status(201).json(response);
    };

    getById = async (req: Request, res: Response) => {
        const order = await this.orderService.getOrderById(req.params?.id);
        res.status(200).json(order);
    };
    getAllOrders = async (_req: Request, res: Response) => {
        const orders = await this.orderService.getAllOrders();
        res.status(200).json(orders);
    };
    checkout = async (req: Request, res: Response) => {
        const response = await this.orderService.checkoutOrder(req.params.id);
        res.status(200).json(response);
    };
    delete = async (req: Request, res: Response) => {
        await this.orderService.deleteOrder(req.params.id);
        res.status(204).send();
    };
    getOrderSummary = async (req: Request, res: Response) => {
        const response = await this.orderService.getOrderSummary(req.params.id);
        res.status(200).json(response);
    }
}
