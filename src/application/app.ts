import express from "express";
import publicRouter from "../routes/publicRoutes";
import authRouter from "../routes/authRoutes";
import adminRoutes from "../routes/adminRoutes";
import { errorMiddleware } from "../middlewares/error-middleware";
import { authMiddleware } from "../middlewares/auth-middleware";
import path from "path";
import fs from 'fs';
// import { protectedRouter } from "../routers/protected-router";




const app = express();

app.use(express.json());
app.use('/public', publicRouter); // Use the publicRouter directly
app.use(errorMiddleware); // Error handling middleware
app.use('/auth',authRouter);
app.use('/admin',adminRoutes);
console.log('Serving static files from:', path.join(__dirname, 'src', 'middlewares', 'uploads', 'images'));
app.use('/uploads/images', express.static(path.join(__dirname, 'src', 'middlewares', 'uploads', 'images')));








export default app;
