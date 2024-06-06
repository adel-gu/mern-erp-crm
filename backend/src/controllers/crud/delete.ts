import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const deleteDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(new AppErrorHandler('No document with that ID', 400));

    res.status(201).json({
      status: 'success',
      data: null,
    });
  });

export default deleteDoc;
