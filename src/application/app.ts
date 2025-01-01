import express from "express";
import publicRouter from "../routes/publicRoutes";
import { errorMiddleware } from "../middlewares/error-middleware";
// import { protectedRouter } from "../routers/protected-router";

const app = express();

app.use(express.json());
app.use(publicRouter); // Use the publicRouter directly
// app.use(protectedRouter); // You can uncomment if you have protected routes
app.use(errorMiddleware); // Error handling middleware

export default app;
