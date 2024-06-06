import { ModelsEnum } from '../../utils/Constants';
import createCRUDController from '../crud';

const client = createCRUDController(ModelsEnum.Client);

export default client;
