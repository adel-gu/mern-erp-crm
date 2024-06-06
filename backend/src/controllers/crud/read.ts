import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const readDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    const doc = await Model.findOne({
      _id: req.params.id,
      tenantId: req.tenantId,
    });

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
