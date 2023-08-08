import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";

// get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully retrieved all users",
    data: result,
  });
});

//get Single User
const getSingleUsers = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully retrieved user",
    data: result,
  });
});

// update user
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await UserService.updateUser(id, data);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully updated user",
    data: result,
  });
});

// delete user
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully deleted user",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
};
