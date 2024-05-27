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
import checkAuthToken from './checkAuthToken';

export default {
  signup,
  validateUserSignUpRequest,
  login,
  validateUserLoginRequest,
  forgotPassword,
  validateUserForgotPasswordRequest,
  resetPassword,
  validateUserResetPasswordRequest,
  checkAuthToken,
};
