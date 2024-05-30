import express from 'express';
import adminAuth from '../../controllers/coreControllers/authController';
import meController from '../../controllers/coreControllers/meController';

const router = express.Router();

//                  !Profile management                    //

router.use(adminAuth.checkAuthToken);
router.route('/admin/profile').get(meController.setId, meController.read);
export default router;
