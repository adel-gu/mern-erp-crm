import { NextFunction, Request, Response } from 'express';
import Admin from '../../models/Admin';
import setToken from './setToken';
import catchErrors from '../../handlers/errors/catchErrors';

const signup = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm } = req.body;
    const admin = await Admin.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    setToken(res, admin._id.toString(), 'user sign up successfully');
  },
);

export default signup;
