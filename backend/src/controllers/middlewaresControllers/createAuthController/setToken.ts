import { Response } from 'express';
import jwt from 'jsonwebtoken';

const setToken = (res: Response, id: string, message: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '10d',
  });
  res
    .status(200)
    .cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'prod',
      maxAge: 10 * 24 * 60 * 60 * 1000,
    })
    .json({
      status: 'success',
      message,
    });
};

export default setToken;
