import mongoose from 'mongoose';

const connectDB = async () => {
  let url = process.env.MONGO_URI;
  if (!url) {
    console.log('Please add MONGO_URI in the .env');
  }
  try {
    await mongoose.connect(url);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.log('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
