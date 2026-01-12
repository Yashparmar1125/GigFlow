import express from "express";
import cookieParser from "cookie-parser";

import corsMiddleware from "./config/cors.config.js";
import rateLimitMiddleware from "./config/rateLimit.config.js";
import securityMiddleware from "./middlewares/security.middleware.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import routes from "./routes/index.js";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Core middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Security & infra
app.use(securityMiddleware);
app.use(corsMiddleware);
app.use(rateLimitMiddleware);
app.use(loggerMiddleware);

// Routes
app.use("/api", routes);

// Root
app.get("/", (_, res) => {
  res.send("Root route working");
});

// Errors
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
