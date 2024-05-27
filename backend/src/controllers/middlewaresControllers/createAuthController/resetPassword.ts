import crypto from 'crypto';
import { Request, Response } from 'express';
import Admin from '../../../models/coreModels/Admin';
import AdminPassword from '../../../models/coreModels/AdminPassword';
import setToken from './setToken';

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const admin = await Admin.findOne({ email });
    const adminPassword = await AdminPassword.findOne({
      user: admin?._id,
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!admin || !adminPassword)
      return res
        .status(400)
        .json({ status: 'fail', message: 'Token is Invalid or has expired' });

    adminPassword.password = req.body.password;
    adminPassword.passwordConfirm = req.body.passwordConfirm;
    adminPassword.passwordResetToken = undefined;
    adminPassword.passwordResetExpires = undefined;

    await adminPassword.save();

    setToken(res, admin._id.toString(), 'Password reset successfully!');
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ status: 'error', error });
  }
};

export default resetPassword;
