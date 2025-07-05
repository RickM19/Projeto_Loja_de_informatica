import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API-VENDAS-BD Documentation',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
    },
    apis: [], // Path to the API docs
};
const swaggerSpec = swaggerJSDoc(options);

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);
app.use(errorHandler);

export { app };
