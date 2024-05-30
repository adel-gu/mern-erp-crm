import readDoc from './read';

// export default {
//   read: readDoc,
// };

const createCRUDController = (model: string) => {
  return {
    read: readDoc(model),
  };
};

export default createCRUDController;
