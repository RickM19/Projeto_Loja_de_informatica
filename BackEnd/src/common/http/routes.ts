import { UserController } from '@/controllers/UserController';
import { Request, Response, Router } from 'express';
import { authMiddleware } from './middlewares/authMiddleware';

const routes = Router();

routes.get('/', (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Ola mundo!' });
    return;
});

routes.post('/user', new UserController().create);
routes.post('/login', new UserController().login);

routes.use(authMiddleware);
routes.get('/profile', new UserController().getProfile);

export { routes };
