import Dexie, { Table } from 'dexie';

export class Database extends Dexie {
  friends!: Table<string>;

  constructor() {
    super('TerminalDB');
    this.version(1).stores({
      friends: '++id',
    });
  }
}

export const db = new Database();
