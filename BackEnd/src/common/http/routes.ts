import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (_req: Request, res: Response): void => {
    res.status(200).json({ message: 'Ola mundo!' });
    return;
});

export { routes };
