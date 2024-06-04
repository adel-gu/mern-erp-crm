import express from 'express';
import people from '../controllers/app/people';

const router = express.Router();

//                  !App resource                    //
router.route(`/people`).get(people.readAll).post(people.create);
router
  .route(`/people/:id`)
  .get(people.read)
  .patch(people.update)
  .delete(people.delete);

export default router;
