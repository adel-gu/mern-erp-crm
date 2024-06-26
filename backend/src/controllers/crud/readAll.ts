import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../handlers/errors/catchErrors';
import APIFeatures, { LIMIT } from '../../handlers/api/apiFeatures';
import mongoose from 'mongoose';

const readAllDocs = (model: string) =>
  catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const Model = mongoose.model(model);
    const page = req.query.page ? parseInt(req.query.page as string) : 1;

    let query = new APIFeatures(
      Model.find({ tenantId: req.tenantId }),
      req.query,
    )
      .filter()
      .paginate(page).query;

    const docs = await query;
    const totalItems = await Model.countDocuments({ active: { $ne: false } });
    const totalPages = Math.ceil(totalItems / LIMIT);

    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems,
      pageSize: LIMIT,
    };

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: docs,
      pagination: pagination,
    });
  });

export default readAllDocs;
