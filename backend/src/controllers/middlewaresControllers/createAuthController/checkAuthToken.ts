import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../../../models/coreModels/Admin';
import AdminPassword from '../../../models/coreModels/AdminPassword';

import catchErrors from '../../../handlers/errors/catchErrors';
import AppErrorHandler from '../../../handlers/errors/appErrorHandler';

declare global {
  namespace Express {
    interface Request {
      adminId: string;
    }
  }
}

const checkAuthToken = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token'];
    if (!token) return next(new AppErrorHandler('', 401));

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;

    const admin = await Admin.findById(verifyToken.id);
    const adminPassword = await AdminPassword.findOne({ user: admin?._id });

    if (!admin || !adminPassword)
      return next(
        new AppErrorHandler(
          'The user belong to the token no longer exist',
          401,
        ),
      );

    if (
      !!verifyToken.iat &&
      adminPassword.checkIsTokenIssuedAfterPwdChanged(verifyToken.iat)
    )
      return next(
        new AppErrorHandler(
          'The user currently changed password, please login again',
          401,
        ),
      );

    req.adminId = admin?._id.toString();
    next();
  },
);

export default checkAuthToken;
