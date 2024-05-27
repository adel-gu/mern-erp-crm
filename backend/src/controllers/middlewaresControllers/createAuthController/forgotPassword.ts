import { Request, Response } from 'express';
import Admin from '../../../models/coreModels/Admin';
import AdminPassword from '../../../models/coreModels/AdminPassword';
import sendEmail from './sendEmail';

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });
    const adminPassword = await AdminPassword.findOne({ userId: admin?._id });

    if (!admin || !adminPassword)
      return res.status(404).json({
        status: 'fail',
        message: 'That email does not exist',
      });

    const resetToken = adminPassword.generateResetToken();
    await adminPassword.save({ validateBeforeSave: false });
    const resetURL = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/reset-password/${resetToken}`;

    const message = `Forgot your password? submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forgot your password, please ignore this email!`;

    try {
      await sendEmail({
        to: admin.email,
        subject: 'Your Password reset token (valid for 10 min)',
        message,
      });
    } catch (error) {
      adminPassword.passwordResetToken = undefined;
      adminPassword.passwordResetExpires = undefined;
      await adminPassword.save({ validateBeforeSave: false });
      console.log(error);
      res.status(400).json({
        status: 'fail',
        message: error,
      });
    }

    res.status(200).json({ status: 'success', message: 'Token sent to email' });
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ status: 'error', error });
  }
};

export default forgotPassword;
