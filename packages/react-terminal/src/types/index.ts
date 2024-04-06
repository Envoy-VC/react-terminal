import React from 'react';

export * from './terminal';
export * from './commands';
export * from './inputbox';
export * from './titlebar';
export * from './welcome';
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

/**
 * Represents a type that removes the `ref` prop from a given React component type.
 *
 * @template T - The React component type.
 */
export type WithoutRef<
  T extends React.ElementType<any, keyof React.JSX.IntrinsicElements>,
> = React.ComponentPropsWithoutRef<T>;

/**
 * Represents a type that completes optional properties of a given type.
 * The resulting type will have all properties of the original type as required,
 * except for those that were already required.
 *
 * @template T - The original type.
 */
export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};

/**
 * Removes undefined values from the properties of a given type.
 *
 * @template T - The type to remove undefined values from.
 */
export type RemoveUndefined<T> = {
  [K in keyof T]: Exclude<T[K], undefined>;
};

/**
 * Represents a type that removes undefined from all properties of T and makes all properties required.
 * @template T - The input type.
 */
export type AllRequired<T> = RemoveUndefined<Complete<T>>;
