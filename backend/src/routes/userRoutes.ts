import express from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController";
import {
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} from "../validators/userValidator";
import { validate } from "../middleware/validation";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUserValidator, validate, createUser);
router.put("/:id", updateUserValidator, validate, updateUser);
router.delete("/:id", deleteUserValidator, validate, deleteUser);

export default router;
