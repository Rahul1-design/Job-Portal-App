import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
dotenv.config({});
import userRoute from './routes/user.route.js';

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api
app.use('/api/v1/user', userRoute);
// "http://localhost:8000/pai/v1/user/register"

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
