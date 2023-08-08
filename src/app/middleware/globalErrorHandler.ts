import { ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../errors/validationError";
import handleCastError from "../../errors/handleCastError";

const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessage: IGenericErrorMessage[] = [];

  if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  } else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: process.env.NODE_ENV !== "production" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
