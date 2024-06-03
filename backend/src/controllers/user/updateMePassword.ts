import { Request, Response, NextFunction } from 'express';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';
import catchErrors from '../../handlers/errors/catchErrors';
import Admin from '../../models/admin';
import setToken from '../auth/setToken';

const updateMePassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, passwordConfirm } = req.body;

    const admin = await Admin.findById(req.params.id).select('+password +salt');

    if (
      !admin ||
      !(await admin.checkIsPasswordCorrect(currentPassword, admin.password))
    )
      return next(new AppErrorHandler('Invalid current password', 401));

    admin.password = newPassword;
    admin.passwordConfirm = passwordConfirm;
    await admin.save();
    admin.salt = undefined;
    setToken(res, admin._id.toString(), 'Password updated successfully');
  },
);

export default updateMePassword;
