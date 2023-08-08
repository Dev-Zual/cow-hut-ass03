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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = orderData.buyer;
    const cowId = orderData.cow;
    // find user details and cow details
    const user = yield user_model_1.default.findById(userId);
    const cow = yield cow_model_1.default.findById(cowId);
    if (!user || !cow) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "user or cow not found");
    }
    if (user.budget < cow.price) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "insufficient budget");
    }
    let newOrderAllData;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // update cow status and cut the balance from buyer
        yield cow_model_1.default.findByIdAndUpdate(cow.id, { label: "Sold Out" }).session(session);
        yield user_model_1.default.findByIdAndUpdate(user.id, {
            $inc: { budget: -cow.price },
        }).session(session);
        // update the seller balance
        yield user_model_1.default.findByIdAndUpdate(cow.seller, { $inc: { income: cow.price } });
        // create a new order
        orderData.buyer = userId;
        orderData.seller = cow.seller;
        orderData.cow = cowId;
        orderData.amount = cow.price;
        const newOrder = yield order_model_1.default.create([orderData], { session });
        newOrderAllData = newOrder[0];
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
    if (newOrderAllData) {
        newOrderAllData = yield order_model_1.default.findOne({ _id: newOrderAllData._id })
            .populate("buyer")
            .populate("cow");
    }
    return newOrderAllData;
});
// get all orders
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.default.find();
});
exports.OrderService = {
    createOrder,
    getAllOrders,
};
