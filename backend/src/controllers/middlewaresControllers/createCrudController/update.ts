import { Request, Response, NextFunction } from 'express';
import mongoose, { Document, Model } from 'mongoose';
import catchErrors from '../../../handlers/errors/catchErrors';
import AppErrorHandler from '../../../handlers/errors/appErrorHandler';

const updateDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(new AppErrorHandler(`Document not found`, 404));
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export default updateDoc;
