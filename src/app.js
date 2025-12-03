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
import sellGadgetRoutes from './routes/sell-gadget.routes.js';
import claimRoutes from './routes/waranty.routes.js';
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from 'dotenv';
import multer from "multer";

const app = express();
dotenv.config();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'OPTIONS','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '50mb' })); 
app.options('*', cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    resource_type: "auto", 
  },
});

const upload = multer({ storage });

dbConnect();
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/appointment', appointmentRoutes);
app.use('/api/v1/repairOrder', repairOrderRoutes);
app.use('/api/v1/gadget', sellGadgetRoutes);
app.use('/api/v1/warrantyClaims', claimRoutes);

app.use('/api/v1/buyBack', buyBackRoutes);
app.use('/api/v1/invoice', invoiceRoutes);
app.use('/api/v1/support', ticketRoutes);

app.use('/api/v1/admin', adminRoutes);

app.post("/uploadFile", upload.single("file"), (req, res) => {
  res.json({
    message: "File uploaded successfully!",
    type: req.file.mimetype,
    url: req.file.path,
  });
});


app.use(errorHandler);

export default app;
