import { Request, Response, NextFunction } from 'express';
import AppErrorHandler from '../../../handlers/errors/appErrorHandler';
import catchErrors from '../../../handlers/errors/catchErrors';
import Admin from '../../../models/coreModels/Admin';
import AdminPassword from '../../../models/coreModels/AdminPassword';

const setUpdateMePassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, passwordConfirm } = req.body;

    const admin = await Admin.findById(req.adminId);
    const adminPassword = await AdminPassword.findOne({
      user: req.adminId,
    }).select('+password');

    if (
      !admin ||
      !adminPassword ||
      !(await adminPassword.checkIsPasswordCorrect(
        currentPassword,
        adminPassword.password,
      ))
    )
      return next(new AppErrorHandler('Invalid current password', 401));

    adminPassword.password = req.body.newPassword;
    adminPassword.passwordConfirm = req.body.passwordConfirm;
    await adminPassword.save();

    res.status(200).json({
      status: 'Success',
      data: adminPassword,
    });
  },
);

export default setUpdateMePassword;
