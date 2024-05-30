import { NextFunction, Request, Response } from 'express';
import Admin from '../../../models/coreModels/Admin';
import AdminPassword from '../../../models/coreModels/AdminPassword';
import mongoose from 'mongoose';
import setToken from './setToken';
import catchErrors from '../../../handlers/errors/catchErrors';

const signup = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { name, email, password, passwordConfirm } = req.body;
      const admin = await Admin.create(
        [
          {
            name,
            email,
          },
        ],
        { session },
      );

      const adminPassword = await AdminPassword.create(
        [
          {
            user: admin[0]._id,
            password,
            passwordConfirm,
          },
        ],
        { session },
      );

      // commit transaction
      await session.commitTransaction();
      session.endSession();

      // const token
      setToken(res, admin[0]._id.toString(), 'user sign up successfully');
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
);

export default signup;
