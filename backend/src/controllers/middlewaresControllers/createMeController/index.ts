import setReadMeId from './setReadMeId';
import createCRUDController from '../createCrudController';
import setUpdateMe from './setUpdateMe';
import updateMePassword from './updateMePassword';
import {
  validateUpdateMePasswordRequest,
  validateUpdateMeRequest,
} from './validation';

const createMeController = () => {
  const meCRUDController = createCRUDController('Admin');

  let meMethods = {
    setReadMeId: setReadMeId,

    readMe: meCRUDController.read,

    setUpdateMeProfileData: setUpdateMe,

    updateMeProfile: meCRUDController.update,
    updateMePassword: updateMePassword,

    validateProfileUpdateMeRequest: validateUpdateMeRequest,
    validatePasswordUpdateMeRequest: validateUpdateMePasswordRequest,
  };
  return meMethods;
};

export default createMeController;
