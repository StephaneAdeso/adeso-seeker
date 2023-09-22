import { randomUUID } from 'crypto';
import { TreeStructure } from '../interfaces/tree-structure.interface';

export class Environment implements TreeStructure {
  uuid: string = randomUUID();
  name: string = '';
  description: string = '';
  items: Map<string, string> = new Map();

  constructor() {}
}
