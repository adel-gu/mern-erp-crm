import express from 'express';
import adminAuth from '../../controllers/coreControllers/authController';
import meController from '../../controllers/coreControllers/meController';

const router = express.Router();

//                  !Profile management                    //

// router.use(meController.setMeId);
router
  .route('/admin/profile')
  .get(meController.setMeId, meController.read)
  .patch(
    meController.validateUpdateRequest,
    meController.setMeId,
    meController.setUpdateBody,
    meController.update,
  );

export default router;
