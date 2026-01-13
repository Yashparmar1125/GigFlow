import "dotenv/config";
import http from "http";
import app from "./app.js";
import connectDB from "./utils/connection.util.js";
import config from "./config/config.js";
import { initSocket } from "./sockets/io.js";

const PORT = config.port || 5000;

let server;

const start = async () => {
  try {
    // Validate environment variables
    config.validateConfig();

    // Connect to database
    await connectDB();

    // Create HTTP server and attach Socket.io
    const httpServer = http.createServer(app);
    initSocket(httpServer);

    // Start Express + Socket.io server
    server = httpServer.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      if (process.env.NODE_ENV === "production") {
        console.log("✅ Production mode enabled");
      }
    });

    // Graceful shutdown
    const gracefulShutdown = (signal) => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);

      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });

      // Force exit after 10 seconds
      setTimeout(() => {
        console.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Log unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      console.error("Unhandled Promise Rejection:", err);
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception:", err);
      gracefulShutdown("uncaughtException");
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
