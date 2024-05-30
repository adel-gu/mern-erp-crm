import { Request, Response, NextFunction } from 'express';

const setMeId = async (req: Request, res: Response, next: NextFunction) => {
  // get current user
  console.log('ADMIN: ', req.adminId);
  req.params.id = req.adminId;
  next();
};

export default setMeId;
