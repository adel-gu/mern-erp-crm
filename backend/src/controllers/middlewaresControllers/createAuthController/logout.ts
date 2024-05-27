import { Request, Response } from 'express';

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('auth_token');
    res.sendStatus(200);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500).json({ status: 'error', error });
  }
};

export default logout;
