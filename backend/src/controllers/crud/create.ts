import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const createDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    const doc = await Model.create(req.body);

    if (!doc)
      return next(new AppErrorHandler('Error creating new document', 500));

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

export default createDoc;
