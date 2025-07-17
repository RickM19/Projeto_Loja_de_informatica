import { ProductController } from '@/controllers/ProductController';
import { UserController } from '@/controllers/UserController';
import { Request, Response, Router } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import { customerRoutes } from '@/routes/CustomerRoutes';
import { orderRoutes } from '@/routes/OrderRoutes';

const routes = Router();

routes.get('/', (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Ola mundo!' });
    return;
});

const productController = new ProductController();
const userController = new UserController();
routes.post('/user', async (req, res) => userController.create(req, res));
routes.post('/login', async (req, res) => userController.login(req, res));

routes.use(authMiddleware);
routes.put('/user', async (req, res) => userController.update(req, res));
routes.get('/profile', async (req, res) => userController.getProfile(req, res));
routes.delete('/user/:id', async (req, res) => userController.delete(req, res));
routes.post('/product', async (req, res) => productController.create(req, res));
routes.get('/product/:id', async (req, res) =>
    productController.getById(req, res),
);
routes.get('/product', async (req, res) =>
    productController.getFiltered(req, res),
);
routes.put('/product/:id', async (req, res) =>
    productController.update(req, res),
);
routes.delete('/product/:id', async (req, res) =>
    productController.delete(req, res),
);
routes.use('/customer', customerRoutes);
routes.use('/order', orderRoutes);

export { routes };
