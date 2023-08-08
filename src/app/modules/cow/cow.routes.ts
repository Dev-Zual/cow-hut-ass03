import express from "express";
import { CowController } from "./cow.controller";
const router = express.Router();

router.delete("/:id", CowController.deleteACow);
router.patch("/:id", CowController.updateCow);
router.get("/:id", CowController.getSingleCow);
router.post("/", CowController.createCow);
router.get("/", CowController.getAllCow);

export const CowRoutes = router;
