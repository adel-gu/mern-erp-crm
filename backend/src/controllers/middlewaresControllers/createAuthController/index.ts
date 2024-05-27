import { NextFunction, Request, Response } from 'express';
import signup from './signup';
import { validateUserSignUpRequest } from './validation';
import { ValidationChain } from 'express-validator';

type IAuthMethods = {
  signup: (req: Request, res: Response) => Promise<void>;
  validateUserSignUpRequest: (
    | ValidationChain
    | ((
        req: Request,
        res: Response,
        next: NextFunction,
      ) => Promise<Response<any, Record<string, any>> | undefined>)
  )[];
};

const createAuthController = () => {
  let authMethods: any = {};

  authMethods.signup = (req: Request, res: Response) => signup(req, res);
  authMethods.validateUserSignUpRequest = validateUserSignUpRequest;

  return authMethods;
};

export default createAuthController;
