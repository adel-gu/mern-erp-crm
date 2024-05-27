import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  next();
};

export const validateUserSignUpRequest = [
  body('name').isString().notEmpty().withMessage('Name must be a string'),
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .notEmpty()
    .withMessage('Email must be a string'),
  body('password')
    .isString()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('password must be a string with at least 8 characters long'),
  body('passwordConfirm')
    .isString()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage(
      'passwordConfirm must be a string with at least 8 characters long',
    ),
  handleValidationErrors,
];

export const validateUserLoginRequest = [
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .notEmpty()
    .withMessage('Email must be a string'),
  body('password')
    .isString()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('password must be a string with at least 8 characters long'),
  handleValidationErrors,
];
