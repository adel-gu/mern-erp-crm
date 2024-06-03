import { NextFunction, Request, Response } from 'express';
import Admin from '../../models/Admin';
import sendEmail from './sendEmail';
import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const forgotPassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin)
      return next(new AppErrorHandler('No user associated to that email', 404));

    const resetToken = admin.generateResetToken();
    await admin.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/reset-password/${admin.email}/${resetToken}`;

    const message = `Forgot your password? submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forgot your password, please ignore this email!`;

    try {
      await sendEmail({
        to: admin.email,
        subject: 'Your Password reset token (valid for 10 min)',
        message,
      });
    } catch (error) {
      admin.passwordResetToken = undefined;
      admin.passwordResetExpires = undefined;
      await admin.save({ validateBeforeSave: false });
      return next(
        new AppErrorHandler(
          'There was an error while sending the reset token email',
          500,
        ),
      );
    }

    res.status(200).json({ status: 'success', message: 'Token sent to email' });
  },
);

export default forgotPassword;
