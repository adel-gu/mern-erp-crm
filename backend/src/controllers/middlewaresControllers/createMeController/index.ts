import setId from './setAdminId';
import createCRUDController from '../createCrudController';

const createMeController = (model: string) => {
  const meCRUDController = createCRUDController(model);
  let meMethods = {
    setId: setId,
    read: meCRUDController.read,
  };
  return meMethods;
};

export default createMeController;
