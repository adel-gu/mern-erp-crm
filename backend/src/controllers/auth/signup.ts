import { NextFunction, Request, Response } from 'express';
import Admin from '../../models/admin';
import setToken from './setToken';
import catchErrors from '../../handlers/errors/catchErrors';
import mongoose from 'mongoose';

const signup = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, passwordConfirm } = req.body;
    const admin = await Admin.create({
      name,
      email,
      password,
      passwordConfirm,
      tenantId: new mongoose.Types.ObjectId(),
    });

    setToken(res, admin._id.toString(), 'user sign up successfully');
  },
);

export default signup;
