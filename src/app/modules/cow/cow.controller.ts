import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { CowService } from "./cow.service";
import { ICow } from "./cow.interface";
import pick from "../../../shared/pick";
import { paginationKey } from "../../../constant/paginationKey";
import { cowFilterableField } from "./cow.constant";

const createCow = catchAsync(async (req, res) => {
  const result = await CowService.createCow(req.body);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully created a new cow",
    data: result,
  });
});

// get all cow
const getAllCow = catchAsync(async (req, res) => {
  const filters = pick(req.query, cowFilterableField);
  const pagination = pick(req.query, paginationKey);
  console.log("controller", filters);
  console.log(pagination);
  const result = await CowService.getAllCow(filters, pagination);

  sendResponse<ICow[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully got all cow",
    meta: result.meta,
    data: result.data,
  });
});

// get single cow
const getSingleCow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully got the cow",
    data: result,
  });
});

// update a cow
const updateCow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CowService.updateCow(id, req.body);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully updated the cow",
    data: result,
  });
});

// delete the cow
const deleteACow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CowService.deleteACow(id);

  sendResponse<ICow>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "successfully delete the cow",
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCow,
  getSingleCow,
  updateCow,
  deleteACow,
};
