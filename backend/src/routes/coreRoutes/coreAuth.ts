import express from 'express';
import adminAuth from '../../controllers/coreControllers/authController';

const router = express.Router();

router
  .route('/signup')
  .post(adminAuth.validateUserSignUpRequest, adminAuth.signup);

export default router;
