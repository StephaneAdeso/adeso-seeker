import { v4 as uuidv4 } from 'uuid';
import { TreeStructure } from '../interfaces/tree-structure.interface';

export class Environment implements TreeStructure {
  uuid: string = `env-${uuidv4()}`;
  name: string = '';
  description: string = '';
  items: Map<string, string> = new Map();

  constructor() {}
}
