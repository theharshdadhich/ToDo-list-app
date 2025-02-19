import express from 'express';
import dotenv from 'dotenv';
// import dbConnection from './config/db.js'
import userRouter from './Router/userRouter.js';
import TaskRouter from './Router/taskRouter.js';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

app.use(express.json());

// CORS Configuration with credentials allowed
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173','https://todo-mern-frontend-six.vercel.app'], // Allow frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow credentials (cookies, etc.)
}));

// Connect to database
connectDB();

// Use routers
app.use('/api/user', userRouter);
app.use('/api/task', TaskRouter);

// Start the server
const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
