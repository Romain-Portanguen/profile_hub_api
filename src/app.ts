import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user-routes';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(bodyParser.json());
app.use(cors());

setupSwagger(app);

app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
