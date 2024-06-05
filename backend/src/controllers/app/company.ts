import { ModelsEnum } from '../../utils/Constants';
import createCRUDController from '../crud';

const company = createCRUDController(ModelsEnum.Company);

export default company;
