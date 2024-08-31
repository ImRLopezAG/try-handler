/* eslint-disable @typescript-eslint/no-explicit-any */
type TryResult<T> = [ErrorHandling | null, T | undefined];
type Callback<T> = () => T;

interface ErrorHandling {
  message: string;
  instance: {
    stack: string | undefined;
    name: string;
    cause: unknown;
  };
}

/**
 * Executes an asynchronous function and handles any errors that occur.
 * @template T The type of the result returned by the asynchronous function.
 * @param {Callback<Promise<T>>} fn The asynchronous function to execute.
 * @returns {Promise<TryResult<T>>} A promise that resolves to a tuple containing either the result of the function or an error object.
 */
export async function tryAsync<T = any>(
  cb: Callback<Promise<T>>
): Promise<TryResult<T>> {
  try {
    const data = await cb();
    return [null, data];
  } catch (error) {
    const { message, stack, name, cause } = error as Error;
    return [{ message, instance: { stack, name, cause } }, undefined];
  }
}

/**
 * Executes a synchronous function and captures any thrown errors.
 *
 * @template T - The type of the return value of the function.
 * @param {Callback<T>} fn - The function to be executed.
 * @returns {TryResult<T>} - An array containing the error object and the return value of the function.
 */
export function trySync<T = any>(cb: Callback<T>): TryResult<T> {
  try {
    const data = cb();
    return [null, data];
  } catch (error) {
    const { message, stack, name, cause } = error as Error;
    return [{ message, instance: { stack, name, cause } }, undefined];
  }
}
