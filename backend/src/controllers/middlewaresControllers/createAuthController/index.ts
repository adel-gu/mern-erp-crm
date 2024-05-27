import signup from './signup';
import login from './login';
import forgotPassword from './forgotPassword';

import {
  validateUserSignUpRequest,
  validateUserLoginRequest,
  validateUserForgotPasswordRequest,
  validateUserResetPasswordRequest,
} from './validation';
import resetPassword from './resetPassword';

export default {
  signup,
  validateUserSignUpRequest,
  login,
  validateUserLoginRequest,
  forgotPassword,
  validateUserForgotPasswordRequest,
  resetPassword,
  validateUserResetPasswordRequest,
};
