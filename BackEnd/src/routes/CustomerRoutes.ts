import { Router } from 'express';
import { CustomerController } from '@/controllers/CustomerController';

const customerRoutes = Router();
const customerController = new CustomerController();

customerRoutes.post('/', async (req, res) =>
    customerController.create(req, res),
);
customerRoutes.get('/:id', async (req, res) =>
    customerController.getById(req, res),
);
customerRoutes.get('/', async (req, res) =>
    customerController.getFiltered(req, res),
);
customerRoutes.put('/:id', async (req, res) =>
    customerController.update(req, res),
);
customerRoutes.delete('/:id', async (req, res) =>
    customerController.delete(req, res),
);
customerRoutes.get('/cpf/:cpf', async (req, res) =>
    customerController.getbyCpf(req, res),
);

export { customerRoutes };
