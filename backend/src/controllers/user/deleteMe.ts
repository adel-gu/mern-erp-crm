import { Request, Response, NextFunction } from 'express';
import catchErrors from '../../handlers/errors/catchErrors';
import Admin from '../../models/admin';

const deleteMe = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    await Admin.findByIdAndUpdate(req.params.id, {
      active: false,
    });

    res
      .status(204)
      .clearCookie('auth_token')
      .json({ status: 'Success', data: null });
  },
);

export default deleteMe;
