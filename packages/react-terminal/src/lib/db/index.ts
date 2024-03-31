import Dexie, { Table } from 'dexie';

import { TerminalHistory } from '~/types/db';

export class Database extends Dexie {
  history!: Table<TerminalHistory>;

  constructor() {
    super('TerminalDB');
    this.version(1).stores({
      history: '++id, type',
    });
  }
}

export const db = new Database();
