import { ProductController } from '@/controllers/ProductController';
import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Ola mundo!' });
    return;
});

const productController = new ProductController();
routes.post('/product', async(req, res) => productController.create(req, res));
routes.get('/product/:id', async (req, res) => productController.getById(req, res));
routes.get('/product', async (req, res) => productController.getFiltered(req, res));
routes.put('/product/:id', async (req, res) => productController.update(req, res));
routes.delete('/product/:id', async (req, res) => productController.delete(req, res));

export { routes };
