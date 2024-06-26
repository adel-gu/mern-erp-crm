import { Request, Response, NextFunction } from 'express';
import mongoose, { Document, Model } from 'mongoose';
import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const updateDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    const { active, ...rest } = req.body;
    const doc = await Model.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      rest,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!doc) return next(new AppErrorHandler(`Document not found`, 404));
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export default updateDoc;
