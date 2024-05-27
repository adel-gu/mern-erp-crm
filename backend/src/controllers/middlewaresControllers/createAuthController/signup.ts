import { Request, Response } from 'express';
import Admin from '../../../models/coreModels/Admin';
import AdminPassword from '../../../models/coreModels/AdminPassword';
import mongoose from 'mongoose';

const signup = async (req: Request, res: Response) => {
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

    console.log('ADMIN: ', admin);

    const adminPassword = await AdminPassword.create(
      [
        {
          userId: admin[0]._id,
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
    res.status(200).json({ status: 'success', data: { adminPassword } });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log('Error: ', error);
    res.status(500).json({ status: 'error', error });
  }
};

export default signup;
