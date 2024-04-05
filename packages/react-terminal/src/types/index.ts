export * from './terminal';
export * from './commands';
export * from './inputbox';
export * from './titlebar';
export * from './output';
export * from './db';

/**
 * Represents a function that returns a promise or a value.
 *
 * @typeParam T - The type of the value returned by the function.
 *
 * @returns A promise or a value of type T.
 *
 * @example
 * ```typescript
 * const myFunction: Awaitable<number> = async () => {
 *   const result = await someAsyncOperation();
 *   return result + 1;
 * };
 * ```
 */
export type Awaitable<T> = () => Promise<T> | T;

export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};

export type RemoveUndefined<T> = {
  [K in keyof T]: Exclude<T[K], undefined>;
};

export type AllRequired<T> = RemoveUndefined<Complete<T>>;
