import { Request, Response, NextFunction } from 'express';

const setId = async (req: Request, res: Response, next: NextFunction) => {
  // get current user
  req.params.id = req.adminId;
  next();
};

export default setId;
