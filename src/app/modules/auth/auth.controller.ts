import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const result = await AuthService.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully created user",
    data: result,
  });
});

export const AuthController = {
  createUser,
};
