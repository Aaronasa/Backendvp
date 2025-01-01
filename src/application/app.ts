import express from "express";
import publicRouter from "../routes/publicRoutes";
import authRouter from "../routes/authRoutes";
import { errorMiddleware } from "../middlewares/error-middleware";
import { authMiddleware } from "../middlewares/auth-middleware";
// import { protectedRouter } from "../routers/protected-router";

const app = express();

app.use(express.json());
app.use('/public', publicRouter); // Use the publicRouter directly
// app.use(protectedRouter); // You can uncomment if you have protected routes
app.use(errorMiddleware); // Error handling middleware
app.use('/auth',authRouter);

export default app;
