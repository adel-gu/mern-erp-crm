import { Request, Response, NextFunction } from 'express';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const setUpdateMe = async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppErrorHandler('This route is not for updating user password', 400),
    );
  req.params.id = req.adminId;
  req.body = {
    name: req.body.name,
    email: req.body.email,
  };

  next();
};

export default setUpdateMe;
