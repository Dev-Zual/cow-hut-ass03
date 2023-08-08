"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = __importDefault(require("./cow.model"));
const paginationHelpers_1 = __importDefault(require("../../../helpers/paginationHelpers"));
const cow_constant_1 = require("./cow.constant");
const createCow = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield cow_model_1.default.create(data);
    return res;
});
// get all cows
const getAllCow = (filters, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: cow_constant_1.cowSearchableField.map((field) => ({
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
    const minPriceCondition = {};
    if (minPrice) {
        minPriceCondition.$gte = Number(minPrice);
        andCondition.push({ price: minPriceCondition });
    }
    // Search max price condition
    const maxPriceCondition = {};
    if (maxPrice) {
        maxPriceCondition.$lte = Number(maxPrice);
        andCondition.push({ price: maxPriceCondition });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.default)(pagination);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const res = yield cow_model_1.default.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: res,
    };
});
// get single cow
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield cow_model_1.default.findOne({ _id: id });
    if (!res) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found");
    }
    return res;
});
// update a cow
const updateCow = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield cow_model_1.default.findOne({ _id: id });
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Not Found cow.");
    }
    const res = yield cow_model_1.default.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return res;
});
// delete a cow from the database
const deleteACow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield cow_model_1.default.findOneAndDelete({ _id: id });
    return res;
});
exports.CowService = {
    createCow,
    getAllCow,
    getSingleCow,
    updateCow,
    deleteACow,
};
