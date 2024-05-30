import readDoc from './read';
import updateDoc from './update';

const createCRUDController = (model: string) => {
  return {
    read: readDoc(model),
    update: updateDoc(model),
  };
};

export default createCRUDController;
