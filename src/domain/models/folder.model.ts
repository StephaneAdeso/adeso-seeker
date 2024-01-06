import { v4 as uuidv4 } from 'uuid';
import { TreeStructure } from '../interfaces/tree-structure.interface';

export class Folder implements TreeStructure {
  uuid: string = `fol-${uuidv4()}`;
  name: string = '';
  // The uuid of the folder or collection of this folder. Folders can be nested.
  parentUuid: string = '';

  constructor() {}
}
