import setMeId from './setMeId';
import createCRUDController from '../createCrudController';
import setUpdateMeBody from './setUpdateMeBody';
import { validateUpdateMeRequest } from './validation';

const createMeController = (model: string) => {
  const meCRUDController = createCRUDController(model);
  let meMethods = {
    setMeId: setMeId,
    read: meCRUDController.read,
    setUpdateBody: setUpdateMeBody,
    update: meCRUDController.updateProfile,
    validateUpdateRequest: validateUpdateMeRequest,
  };
  return meMethods;
};

export default createMeController;
