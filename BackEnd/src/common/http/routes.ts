import { UserController } from '@/controllers/UserController';
import { Request, Response, Router } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';

const routes = Router();

routes.get('/', (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Ola mundo!' });
    return;
});

const userController = new UserController();
routes.post('/user', async(req, res) => userController.create(req, res));
routes.post('/login', async(req, res) => userController.login(req, res));

routes.use(authMiddleware);
routes.put('/user', async(req, res) => userController.update(req, res));
routes.get('/profile', async(req, res) => userController.getProfile(req, res));
routes.delete('/user/:id', async(req, res) => userController.delete(req, res));

export { routes };
