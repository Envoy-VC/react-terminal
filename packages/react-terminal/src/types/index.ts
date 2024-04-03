export * from './terminal';
export * from './db';

export type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};

export type RemoveUndefined<T> = {
  [K in keyof T]: Exclude<T[K], undefined>;
};

export type AllRequired<T> = RemoveUndefined<Complete<T>>;
