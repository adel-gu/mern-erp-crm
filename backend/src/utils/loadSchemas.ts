import fs from 'fs';
import path from 'path';

const loadSchemas = () => {
  const schemasPath = path.resolve(__dirname, '../models/');

  fs.readdirSync(schemasPath).forEach((file) => {
    import(path.join(schemasPath, file));
  });
};

export default loadSchemas;
