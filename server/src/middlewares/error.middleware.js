export const errorHandler = (err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS Error: Origin not allowed" });
  }

  const status = err.status || err.statusCode || 500;

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
    return res.status(status).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  }

  console.error({
    message: err.message,
    url: req.url,
    method: req.method,
  });

  res.status(status).json({
    success: false,
    message: "Something went wrong",
  });
};
