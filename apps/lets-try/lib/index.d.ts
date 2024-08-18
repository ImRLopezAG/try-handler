declare const tryAsync: <T>(fn: () => Promise<T>) => Promise<[T | null, string | null]>;
declare const tryCatch: <T>(fn: () => T) => [T | null, string | null];

export { tryAsync, tryCatch };
