"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cow_constant_1.locations,
    },
    breed: {
        type: String,
        required: true,
        enum: cow_constant_1.breeds,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: ["For Sale", "Sold Out"],
        default: "For Sale",
    },
    category: {
        type: String,
        required: true,
        enum: ["Dairy", "Beef", "Dual Purpose"],
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const Cow = (0, mongoose_1.model)("Cow", cowSchema);
exports.default = Cow;
