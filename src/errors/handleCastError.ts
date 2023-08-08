import mongoose from "mongoose";
import { IGenericErrorResponse } from "../interfaces/common";
import { IGenericErrorMessage } from "../interfaces/error";

const handleCastError = (
  err: mongoose.Error.CastError
): IGenericErrorResponse => {
  const error: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: "Invalid Id",
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: "Cast error",
    errorMessage: error,
  };
};

export default handleCastError;
