import { ModelsEnum } from '../../utils/Constants';
import createCRUDController from '../crud';

const people = createCRUDController(ModelsEnum.People);

export default people;
