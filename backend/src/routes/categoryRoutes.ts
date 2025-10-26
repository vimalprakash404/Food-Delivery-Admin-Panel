import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import {
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} from "../validators/categoryValidator";
import { validate } from "../middleware/validation";

const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategoryValidator, validate, createCategory);
router.put("/:id", updateCategoryValidator, validate, updateCategory);
router.delete("/:id", deleteCategoryValidator, validate, deleteCategory);

export default router;
