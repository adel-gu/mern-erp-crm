import createCRUDController from '../crud';
import setReadMeId from './setReadMeId';
import setUpdateMe from './setUpdateMe';
import updateMePassword from './updateMePassword';
import deleteMe from './deleteMe';
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

    deleteMe: deleteMe,

    validateProfileUpdateMeRequest: validateUpdateMeRequest,
    validatePasswordUpdateMeRequest: validateUpdateMePasswordRequest,
  };
  return meMethods;
};

export default createMeController;
