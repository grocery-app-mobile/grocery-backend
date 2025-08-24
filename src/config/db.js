import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const dbConnect = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('Missing MONGO_URI in .env');

    await mongoose.connect(uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 45000,  
        connectTimeoutMS: 30000, 
      }
    );
    console.log('✅ MongoDB connected!');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

export default dbConnect;
