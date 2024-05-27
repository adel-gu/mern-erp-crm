import { Request, Response } from 'express';
import Admin from '../../../models/coreModels/Admin';
import AdminPassword from '../../../models/coreModels/AdminPassword';
import setToken from './setToken';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    const adminPassword = await AdminPassword.findOne({ user: admin?._id });

    if (
      !admin ||
      !adminPassword ||
      !(await adminPassword.checkIsPasswordCorrect(
        password,
        adminPassword.password,
      ))
    )
      return res.status(401).json({
        status: 'fail',
        message: 'Invalid credentials',
      });

    // const token
    setToken(res, admin._id.toString(), 'user login successfully');
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ status: 'error', error });
  }
};

export default login;
