import ModelsEnum from '../../utils/Models';
import createCRUDController from '../crud';

const people = createCRUDController(ModelsEnum.People);

export default people;
