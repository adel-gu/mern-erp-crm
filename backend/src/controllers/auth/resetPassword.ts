import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import Admin from '../../models/admin';
import setToken from './setToken';
import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const resetPassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const admin = await Admin.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!admin)
      return next(new AppErrorHandler('Token is Invalid or has expired', 400));

    admin.password = req.body.password;
    admin.passwordConfirm = req.body.passwordConfirm;
    admin.passwordResetToken = undefined;
    admin.passwordResetExpires = undefined;

    await admin.save();

    setToken(res, admin._id.toString(), 'Password reset successfully!');
  },
);

export default resetPassword;
