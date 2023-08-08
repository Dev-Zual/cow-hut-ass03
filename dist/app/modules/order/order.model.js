"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cowOrderSchema = new mongoose_1.Schema({
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cow: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Cow",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});
const CowOrder = (0, mongoose_1.model)("CowOrder", cowOrderSchema);
exports.default = CowOrder;
