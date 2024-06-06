import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import catchErrors from '../../handlers/errors/catchErrors';
import AppErrorHandler from '../../handlers/errors/appErrorHandler';

const createDoc = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    req.body.createdBy = req.adminId;
    req.body.tenantId = req.tenantId;
    const { active, ...rest } = req.body;
    const doc = await Model.create(rest);

    if (!doc)
      return next(new AppErrorHandler('Error creating new document', 500));

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

export default createDoc;
