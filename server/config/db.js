import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/swarnandhra_cms';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    autoIndex: true,
  });
}