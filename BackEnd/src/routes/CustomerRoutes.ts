import { Router } from 'express';
import { CustomerController } from '@/controllers/CustomerController';

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.post('/', customerController.create);
customerRoutes.get('/old', customerController.getOldCustomers);
customerRoutes.get('/:id', customerController.getById);
customerRoutes.get('/', customerController.getFiltered);
customerRoutes.put('/:id', customerController.update);
customerRoutes.delete('/:id', customerController.delete);
customerRoutes.get('/cpf/:cpf', customerController.getbyCpf);

export { customerRoutes };
