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

/**
 * The database instance used for storing data.
 *
 * @group Classes
 *
 * @remarks
 * This instance is created using the `Database` class from the `dexie` package.
 * It can be used to perform various database operations such as querying, inserting, updating, and deleting data.
 *
 * @example
 * ```typescript
 * import { db } from '@envoy1084/react-terminal';
 *
 * // Insert a new record
 * db.history.put({
 *    type: 'command',
 *    command: 'ls',
 * })
 *
 * // Query records
 * const result = await db.history.where('type').equals('command').toArray();
 * console.log(result); // [{ id: 1, type: 'command', command: 'ls' }]
 * ```
 *
 * @see {@link https://dexie.org/ | Dexie Documentation}
 */
export const db = new Database();
