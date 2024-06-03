import { NextFunction, Request, Response } from 'express';
import Admin from '../../models/coreModels/Admin';
import AdminPassword from '../../models/coreModels/AdminPassword';
import setToken from './setToken';
import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const login = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    const adminPassword = await AdminPassword.findOne({
      user: admin?._id,
    }).select('+password');

    if (
      !admin ||
      !adminPassword ||
      !(await adminPassword.checkIsPasswordCorrect(
        password,
        adminPassword.password,
      ))
    )
      return next(new AppErrorHandler('Invalid credentials', 401));

    // const token
    setToken(res, admin._id.toString(), 'user logged in successfully');
  },
);

export default login;
