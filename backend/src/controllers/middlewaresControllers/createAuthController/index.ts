import signup from './signup';
import login from './login';
import forgotPassword from './forgotPassword';

import {
  validateUserSignUpRequest,
  validateUserLoginRequest,
  validateUserForgotPasswordRequest,
} from './validation';

export default {
  signup,
  validateUserSignUpRequest,
  login,
  validateUserLoginRequest,
  forgotPassword,
  validateUserForgotPasswordRequest,
};
