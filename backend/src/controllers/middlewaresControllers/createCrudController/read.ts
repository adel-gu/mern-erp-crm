import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../../handlers/errors/catchErrors';
import mongoose, { Document, Model } from 'mongoose';
import AppErrorHandler from '../../../handlers/errors/appErrorHandler';

const readDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    const doc = await Model.findById(req.params.id);

    if (!doc)
      return next(
        new AppErrorHandler('Document with that ID is not found', 404),
      );

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export default readDoc;
