import { body, param } from "express-validator";

export const createUserValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .isMobilePhone("any")
    .withMessage("Must be a valid mobile number"),
];

export const updateUserValidator = [
  param("id")
    .isMongoId()
    .withMessage("Must be a valid user ID"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),
  body("mobile")
    .optional()
    .trim()
    .isMobilePhone("any")
    .withMessage("Must be a valid mobile number"),
];

export const deleteUserValidator = [
  param("id")
    .isMongoId()
    .withMessage("Must be a valid user ID"),
];
