import cors from "cors";

const getAllowedOrigins = () => {
  const defaultOrigins = [
    "https://gigflow.yashparmar.in",
    "https://gigflowapp.vercel.app",
    "http://gigflow.yashparmar.in",
    "http://gigflowapp.vercel.app",
  ];

  if (process.env.ALLOWED_ORIGINS) {
    return [
      ...process.env.ALLOWED_ORIGINS.split(",").map(o => o.trim()),
      ...defaultOrigins
    ];
  }

  if (process.env.NODE_ENV !== "production") {
    return [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      ...defaultOrigins
    ];
  }

  return defaultOrigins;
};

const allowedOrigins = getAllowedOrigins();

export default cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.error(`CORS blocked origin: ${origin}`);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
});
