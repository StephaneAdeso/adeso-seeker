import { randomUUID } from 'crypto';
import { TreeStructure } from '../interfaces/tree-structure.interface';
import { Request } from './request.model';

export class Folder implements TreeStructure {
  uuid: string = randomUUID();
  name: string = '';
  items: (Folder | Request)[] = [];

  constructor() {}
}
