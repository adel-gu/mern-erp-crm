import signup from './signup';
import login from './login';
import forgotPassword from './forgotPassword';
import resetPassword from './resetPassword';
import checkAuthToken from './checkAuthToken';
import logout from './logout';

import {
  validateUserSignUpRequest,
  validateUserLoginRequest,
  validateUserForgotPasswordRequest,
  validateUserResetPasswordRequest,
} from './validation';

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
  logout,
};
