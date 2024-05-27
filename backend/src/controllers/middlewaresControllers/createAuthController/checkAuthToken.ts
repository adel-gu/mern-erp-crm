import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../../../models/coreModels/Admin';
import AdminPassword from '../../../models/coreModels/AdminPassword';

declare global {
  namespace Express {
    interface Request {
      adminId: string;
    }
  }
}

const checkAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies['auth_token'];
    if (!token)
      return res.status(401).json({ status: 'fail', message: 'Access denied' });

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as jwt.JwtPayload;

    const admin = await Admin.findById(verifyToken.id);
    const adminPassword = await AdminPassword.findOne({ user: admin?._id });

    if (!admin || !adminPassword)
      return res.status(401).json({
        status: 'fail',
        message: 'The user belong to the token no longer exist',
      });

    if (
      !!verifyToken.iat &&
      adminPassword.checkIsTokenIssuedAfterPwdChanged(verifyToken.iat)
    )
      return res.status(401).json({
        status: 'fail',
        message: 'The user currently changed password, please login again',
      });

    req.adminId = admin?._id.toString();
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

export default checkAuthToken;
