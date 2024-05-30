import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../../handlers/errors/catchErrors';
import Admin from '../../../models/coreModels/Admin';
import AdminPassword from '../../../models/coreModels/AdminPassword';
import mongoose from 'mongoose';

const deleteMe = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const admin = await Admin.findByIdAndUpdate(
        req.adminId,
        {
          active: false,
        },
        { session },
      );
      const adminPassword = await AdminPassword.findOneAndUpdate(
        {
          user: req.adminId,
        },
        { active: false },
        { session },
      );

      // commit transaction
      await session.commitTransaction();
      session.endSession();

      res.status(204).json({ status: 'Success', data: null });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  },
);

export default deleteMe;
