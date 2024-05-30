import {
  body,
  FieldValidationError,
  validationResult,
} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import AppErrorHandler from '../../../handlers/errors/appErrorHandler';
import catchErrors from '../../../handlers/errors/catchErrors';

const handleValidationErrors = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) errors.throw;
    next();
  },
);

export const validateUpdateMeRequest = [
  body('name').isString().notEmpty().withMessage('Name must be a string'),
  body('email')
    .trim()
    .toLowerCase()
    .isEmail()
    .notEmpty()
    .withMessage('Email must be a string'),
  handleValidationErrors,
];
