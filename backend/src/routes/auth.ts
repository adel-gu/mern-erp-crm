import express from 'express';
import auth from '../controllers/auth';

const router = express.Router();

router.route('/signup').post(auth.validateUserSignUpRequest, auth.signup);
router.route('/login').post(auth.validateUserLoginRequest, auth.login);
router
  .route('/forgot-password')
  .post(auth.validateUserForgotPasswordRequest, auth.forgotPassword);
router
  .route('/reset-password/:token')
  .patch(auth.validateUserResetPasswordRequest, auth.resetPassword);
router.route('/logout').post(auth.checkAuthToken, auth.logout);

export default router;
