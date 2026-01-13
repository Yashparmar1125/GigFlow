import { body, validationResult } from "express-validator";

export const validateGigSchema = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 120 }),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 2000 }),
  body("budget")
    .notEmpty()
    .withMessage("Budget is required")
    .isFloat({ min: 1 })
    .withMessage("Budget must be greater than 0"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
