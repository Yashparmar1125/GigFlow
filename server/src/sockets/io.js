import { Server } from "socket.io";

let ioInstance;

const getAllowedOrigins = () => {
  const defaultOrigins = [
    "https://gigflow.yashparmar.in",
    "https://gigflowapp.vercel.app",
    "http://gigflow.yashparmar.in", // Just in case
    "http://gigflowapp.vercel.app",
  ];

  if (process.env.ALLOWED_ORIGINS) {
    return [
      ...process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim()),
      ...defaultOrigins,
    ];
  }

  if (process.env.NODE_ENV !== "production") {
    return [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://localhost:4173",
      ...defaultOrigins,
    ];
  }

  return defaultOrigins;
};

export const initSocket = (httpServer) => {
  if (ioInstance) {
    return ioInstance;
  }

  const allowedOrigins = getAllowedOrigins();
  console.log("Socket allowed origins:", allowedOrigins);

  ioInstance = new Server(httpServer, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        console.error(`Socket CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    },
  });

  ioInstance.on("connection", (socket) => {
    const userId = socket.handshake.auth?.userId;

    console.log("Socket client connected", {
      socketId: socket.id,
      userId,
      origin: socket.handshake.headers.origin,
    });

    if (userId) {
      socket.join(`user:${userId}`);
    }

    socket.on("disconnect", (reason) => {
      console.log("Socket client disconnected", {
        socketId: socket.id,
        reason,
      });
    });
  });

  return ioInstance;
};

export const getIo = () => ioInstance;


