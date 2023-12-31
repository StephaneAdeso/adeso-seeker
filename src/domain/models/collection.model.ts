import { randomUUID } from 'crypto';
import { TreeStructure } from '../interfaces/tree-structure.interface';
import { Folder } from './folder.model';
import { Request } from './request.model';

export class Collection implements TreeStructure {
  uuid: string = randomUUID();
  name: string = '';
  items: (Folder | Request)[] = [];
  description: string = '';

  constructor() {}
}
