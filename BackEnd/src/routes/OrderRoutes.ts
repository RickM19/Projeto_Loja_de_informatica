import { Router } from 'express';
import { OrderController } from '@/controllers/OrderController';

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post('/', orderController.create);
orderRoutes.get('/last', orderController.getLastOrderDate);
orderRoutes.get('/:id', orderController.getById);
orderRoutes.get('/summary/:id', orderController.getOrderSummary);
orderRoutes.get('/', orderController.getAllOrders);
orderRoutes.patch('/:id/checkout', orderController.checkout);
orderRoutes.delete('/:id', orderController.delete);

export { orderRoutes };
