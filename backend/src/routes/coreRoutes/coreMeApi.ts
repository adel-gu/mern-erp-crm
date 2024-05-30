import express from 'express';
import meController from '../../controllers/coreControllers/meController';

const router = express.Router();

//                  !Profile management                    //

// router.use(meController.setMeId);
router
  .route('/')
  .get(meController.setReadMeId, meController.readMe)
  .patch(
    meController.validateProfileUpdateMeRequest,
    meController.setUpdateMeProfileData,
    meController.updateMeProfile,
  )
  .delete(meController.deleteMe);

router
  .route('/update-password')
  .patch(
    meController.validatePasswordUpdateMeRequest,
    meController.updateMePassword,
  );

export default router;
