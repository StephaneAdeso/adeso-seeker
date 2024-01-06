import { v4 as uuidv4 } from 'uuid';
import { TreeStructure } from '../interfaces/tree-structure.interface';

export class Collection implements TreeStructure {
  uuid: string = `col-${uuidv4()}`;
  name: string = '';
  description: string = '';

  constructor() {}
}
