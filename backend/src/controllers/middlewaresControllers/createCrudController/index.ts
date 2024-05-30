import readDoc from './read';
import updateDoc from './update';

// export default {
//   read: readDoc,
// };

const createCRUDController = (model: string) => {
  return {
    read: readDoc(model),
    updateProfile: updateDoc(model),
  };
};

export default createCRUDController;
