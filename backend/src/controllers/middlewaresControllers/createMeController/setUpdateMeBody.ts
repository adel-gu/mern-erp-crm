import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../../handlers/errors/catchErrors';
import AppErrorHandler from '../../../handlers/errors/appErrorHandler';

const setUpdateMeBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppErrorHandler('This route is not for updating user password', 400),
    );

  req.body = {
    name: req.body.name,
    email: req.body.email,
  };

  next();
};

export default setUpdateMeBody;
