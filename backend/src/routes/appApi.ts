import express from 'express';
import people from '../controllers/app/people';
import company from '../controllers/app/company';

const router = express.Router();

//                  !App resource                    //
router.route(`/people`).get(people.readAll).post(people.create);
router
  .route(`/people/:id`)
  .get(people.read)
  .patch(people.update)
  .delete(people.delete);

router.route(`/company`).get(company.readAll).post(company.create);
router
  .route(`/company/:id`)
  .get(company.read)
  .patch(company.update)
  .delete(company.delete);

export default router;
