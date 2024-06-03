import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import Admin from '../../models/coreModels/Admin';
import AdminPassword from '../../models/coreModels/AdminPassword';
import setToken from './setToken';
import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const resetPassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const admin = await Admin.findOne({ email });
    const adminPassword = await AdminPassword.findOne({
      user: admin?._id,
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!admin || !adminPassword)
      return next(new AppErrorHandler('Token is Invalid or has expired', 400));

    adminPassword.password = req.body.password;
    adminPassword.passwordConfirm = req.body.passwordConfirm;
    adminPassword.passwordResetToken = undefined;
    adminPassword.passwordResetExpires = undefined;

    await adminPassword.save();

    setToken(res, admin._id.toString(), 'Password reset successfully!');
  },
);

export default resetPassword;
