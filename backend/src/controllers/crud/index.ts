import readAllDocs from './readAll';
import readDoc from './read';
import createDoc from './create';
import updateDoc from './update';
import deleteDoc from './delete';

const createCRUDController = (model: string) => {
  return {
    readAll: readAllDocs(model),
    read: readDoc(model),
    create: createDoc(model),
    update: updateDoc(model),
    delete: deleteDoc(model),
  };
};

export default createCRUDController;
