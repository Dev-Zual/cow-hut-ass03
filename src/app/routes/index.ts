import express from "express";

const router = express.Router();
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { CowRoutes } from "../modules/cow/cow.routes";
import { OrderRoutes } from "../modules/order/order.routes";

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.map((route) => router.use(route.path, route.route));

export default router;
