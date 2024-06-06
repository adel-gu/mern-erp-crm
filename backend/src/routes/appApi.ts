import express from 'express';
import people from '../controllers/app/people';
import company from '../controllers/app/company';
import client from '../controllers/app/client';

import setupRoute from '../utils/setupAppRoutes';
import { Resource } from '../utils/Constants';

const router = express.Router();

//                  !App resource                    //
setupRoute(router, Resource.people, people);
setupRoute(router, Resource.company, company);
setupRoute(router, Resource.client, client);

export default router;
