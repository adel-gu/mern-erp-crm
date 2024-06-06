import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import Admin from '../../models/admin';

import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

declare global {
  namespace Express {
    interface Request {
      adminId: string;
      tenantId: string;
    }
  }
}

const checkAuthToken = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['auth_token'];

    if (!token)
      return next(
        new AppErrorHandler('You are not logged in. Please login again.', 401),
      );

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;

    const admin = await Admin.findById(verifyToken.id);

    if (!admin)
      return next(
        new AppErrorHandler(
          'The user belong to the token no longer exist',
          401,
        ),
      );

    if (
      !!verifyToken.iat &&
      admin.checkIsTokenIssuedAfterPwdChanged(verifyToken.iat)
    )
      return next(
        new AppErrorHandler(
          'The user currently changed password, please login again',
          401,
        ),
      );

    req.adminId = admin._id.toString();
    req.tenantId = admin.tenantId.toString();
    next();
  },
);

export default checkAuthToken;
