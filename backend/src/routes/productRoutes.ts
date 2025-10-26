import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} from "../validators/productValidator";
import { validate } from "../middleware/validation";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProductValidator, validate, createProduct);
router.put("/:id", updateProductValidator, validate, updateProduct);
router.delete("/:id", deleteProductValidator, validate, deleteProduct);

export default router;
