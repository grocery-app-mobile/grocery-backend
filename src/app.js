import express from 'express';
import cors from 'cors';
import dbConnect from './config/db.js';
import errorHandler from './middlewares/error.middleware.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'OPTIONS','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','mypay-api-key'],
}));

app.use(express.json({ limit: '50mb' })); 
app.options('*', cors());

dbConnect();
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);

app.use(errorHandler);

export default app;
