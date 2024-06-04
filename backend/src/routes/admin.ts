import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

//                  !Profile management                    //

// router.use(meController.setMeId);
router
  .route('/admin/profile')
  .get(userController.setMeId, userController.readMe)
  .patch(
    userController.validateProfileUpdateMeRequest,
    userController.setMeId,
    userController.setUpdateMeProfileData,
    userController.updateMeProfile,
  )
  .delete(userController.setMeId, userController.deleteMe);

router
  .route('/admin/profile/update-password')
  .patch(
    userController.validatePasswordUpdateMeRequest,
    userController.setMeId,
    userController.updateMePassword,
  );

//                  !Admin management                    //
export default router;
