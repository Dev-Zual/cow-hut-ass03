"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const cow_routes_1 = require("../modules/cow/cow.routes");
const order_routes_1 = require("../modules/order/order.routes");
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/cows",
        route: cow_routes_1.CowRoutes,
    },
    {
        path: "/orders",
        route: order_routes_1.OrderRoutes,
    },
];
moduleRoutes.map((route) => router.use(route.path, route.route));
exports.default = router;
