import express from "express";
import { createOrder, getOrders } from "../controllers/orderController";
import { createOrderValidator } from "../validators/orderValidator";
import { validate } from "../middleware/validation";

const router = express.Router();

router.post("/", createOrderValidator, validate, createOrder);
router.get("/", getOrders);

export default router;
