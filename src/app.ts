import express, { Application } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import router from "./app/routes";
import httpStatus from "http-status";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

// Application Routes
app.use("/api/v1/", router);

app.use(globalErrorHandler);

//handle not found routes
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMassage: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
