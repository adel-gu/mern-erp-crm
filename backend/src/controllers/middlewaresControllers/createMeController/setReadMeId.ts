import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../../handlers/errors/catchErrors';

const setReadMeId = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    req.params.id = req.adminId;
    next();
  },
);

export default setReadMeId;
