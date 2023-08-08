import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ICow, ICowFilter } from "./cow.interface";
import Cow from "./cow.model";
import { IPagination } from "../../../interfaces/pagination";
import paginationHelper from "../../../helpers/paginationHelpers";
import { IGenericPromiseResponse } from "../../../interfaces/common";
import { FilterQuery, SortOrder } from "mongoose";
import { cowSearchableField } from "./cow.constant";

const createCow = async (data: ICow): Promise<ICow | null> => {
  const res = await Cow.create(data);
  return res;
};

// get all cows
const getAllCow = async (
  filters: ICowFilter,
  pagination: IPagination
): Promise<IGenericPromiseResponse<ICow[] | null>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const andCondition: FilterQuery<ICow>[] = [];
  if (searchTerm) {
    andCondition.push({
      $or: cowSearchableField.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Search min price condition
  const minPriceCondition: FilterQuery<ICow> = {};
  if (minPrice) {
    minPriceCondition.$gte = Number(minPrice);
    andCondition.push({ price: minPriceCondition });
  }

  // Search max price condition
  const maxPriceCondition: FilterQuery<ICow> = {};
  if (maxPrice) {
    maxPriceCondition.$lte = Number(maxPrice);
    andCondition.push({ price: maxPriceCondition });
  }

  const { page, limit, skip, sortBy, sortOrder } = paginationHelper(pagination);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const res = await Cow.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: res,
  };
};

// get single cow
const getSingleCow = async (id: string): Promise<ICow | null> => {
  const res = await Cow.findOne({ _id: id });
  if (!res) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found");
  }
  return res;
};

// update a cow
const updateCow = async (
  id: string,
  updateData: Partial<ICow>
): Promise<ICow | null> => {
  const isExists = await Cow.findOne({ _id: id });

  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not Found cow.");
  }

  const res = await Cow.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
  });
  return res;
};

// delete a cow from the database
const deleteACow = async (id: string): Promise<ICow | null> => {
  const res = await Cow.findOneAndDelete({ _id: id });

  return res;
};

export const CowService = {
  createCow,
  getAllCow,
  getSingleCow,
  updateCow,
  deleteACow,
};
