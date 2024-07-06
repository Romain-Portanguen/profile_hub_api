import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.routes';
import { errorHandler } from './middlewares/error-handler.middlewares';
import { setupSwagger } from './config/swagger';

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api', routes);

setupSwagger(app);

app.use(errorHandler);

export default app;
