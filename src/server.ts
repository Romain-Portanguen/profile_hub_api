import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user-routes';
import { errorHandler } from './middlewares/error-handler';
import { setupSwagger } from './config/swagger';

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);

setupSwagger(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
