import createCRUDController from '../crud';
import setMeId from './setMeId';
import setUpdateMe from './setUpdateMe';
import updateMePassword from './updateMePassword';
import deleteMe from './deleteMe';
import {
  validateUpdateMePasswordRequest,
  validateUpdateMeRequest,
} from './validation';

const createUserController = () => {
  const CRUDController = createCRUDController('Admin');

  let meMethods = {
    setMeId: setMeId,

    readMe: CRUDController.read,

    setUpdateMeProfileData: setUpdateMe,

    updateMeProfile: CRUDController.update,
    updateMePassword: updateMePassword,

    deleteMe: deleteMe,

    validateProfileUpdateMeRequest: validateUpdateMeRequest,
    validatePasswordUpdateMeRequest: validateUpdateMePasswordRequest,
  };
  return meMethods;
};

const userController = createUserController();

export default userController;
