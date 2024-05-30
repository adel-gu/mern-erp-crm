import type { ErrorRequestHandler, Response } from 'express';
import AppErrorHandler from './appErrorHandler';

// ? Handle Development errors //
const sendErrorDev = (err: AppErrorHandler, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// ? =============== //

// * Handle Production Errors //
const sendErrorProd = (err: AppErrorHandler, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  console.log('Error 💥: ', err);
  res.status(err.statusCode).json({
    status: 'error',
    message: 'Something went wrong!',
  });
};

const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppErrorHandler(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
  const key = Object.keys(err.keyValue)[0];
  const value = err.keyValue[key];
  const message = `Duplicate field '${key}' value: '${value}'. Please use another value.`;
  return new AppErrorHandler(message, 400);
};

const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data: ${errors.join(', and ')}`;
  return new AppErrorHandler(message, 400);
};

const handleJWTError = (err: any) =>
  new AppErrorHandler('Invalid token, please log in again.', 401);

const handleJWTExpiredError = (err: any) =>
  new AppErrorHandler('Token has been expired, please log in again.', 401);

// * ================ //

// ! Error Request handler controller  //
const errorRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'dev') sendErrorDev(err, res);
  else if (process.env.NODE_ENV === 'prod') {
    let error = Object.assign(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};

export default errorRequestHandler;
