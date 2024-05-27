import express from 'express';
import adminAuth from '../../controllers/coreControllers/authController';

const router = express.Router();

router
  .route('/signup')
  .post(adminAuth.validateUserSignUpRequest, adminAuth.signup);
router
  .route('/login')
  .post(adminAuth.validateUserLoginRequest, adminAuth.login);
router
  .route('/forgot-password')
  .post(adminAuth.validateUserForgotPasswordRequest, adminAuth.forgotPassword);
router
  .route('/reset-password/:email/:token')
  .patch(adminAuth.validateUserResetPasswordRequest, adminAuth.resetPassword);

export default router;
