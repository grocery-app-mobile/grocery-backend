import express from 'express';
import cors from 'cors';
import dbConnect from './config/db.js';
import errorHandler from './middlewares/error.middleware.js';
import userRoutes from './routes/user.routes.js';
import customerRoutes from './routes/customer.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';
import repairOrderRoutes from './routes/repairOrder.routes.js';
import buyBackRoutes from './routes/buyBack.routes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'OPTIONS','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '50mb' })); 
app.options('*', cors());

dbConnect();
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/appointment', appointmentRoutes);
app.use('/api/v1/repairOrder', repairOrderRoutes);
app.use('/api/v1/buyBack', buyBackRoutes);
app.use('/api/v1/invoice', invoiceRoutes);
app.use('/api/v1/support', ticketRoutes);

app.use('/api/v1/admin', adminRoutes);

app.use(errorHandler);

export default app;
