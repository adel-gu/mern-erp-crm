import { NextFunction, Request, Response } from 'express';
import signup from './signup';
import login from './login'; // Added import for login function
import {
  validateUserSignUpRequest,
  validateUserLoginRequest,
} from './validation';
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
  login: (
    req: Request,
    res: Response,
  ) => Promise<Response<any, Record<string, any>> | undefined>;
  validateUserLoginRequest: (
    | ValidationChain
    | ((
        req: Request,
        res: Response,
        next: NextFunction,
      ) => Promise<Response<any, Record<string, any>> | undefined>)
  )[];
};

const createAuthController = (): IAuthMethods => {
  const authMethods: IAuthMethods = {
    signup: (req: Request, res: Response) => signup(req, res),
    validateUserSignUpRequest: validateUserSignUpRequest,

    login: (req: Request, res: Response) => login(req, res),
    validateUserLoginRequest: validateUserLoginRequest,
  };

  return authMethods;
};

export default createAuthController;
