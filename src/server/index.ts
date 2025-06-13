import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRoutes } from './routes/userRoutes';
import { ratingRoutes } from './routes/ratingRoutes';
import { authRoutes } from './routes/authRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/credibly')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: 'The requested resource was not found'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 