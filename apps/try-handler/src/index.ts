type TryResult<T> = [ErrorHandling | null, T | null];
type cb<T> = () => T;

interface ErrorHandling {
  message: string;
  stack: string | undefined;
  instance: Error | unknown;
}

/**
 * Executes an asynchronous function and handles any errors that occur.
 * @template T The type of the result returned by the asynchronous function.
 * @param {cb<Promise<T>>} fn The asynchronous function to execute.
 * @returns {Promise<TryResult<T>>} A promise that resolves to a tuple containing either the result of the function or an error object.
 */
export async function tryAsync<T>(fn: cb<Promise<T>>): Promise<TryResult<T>> {
  try {
    const data = await fn();
    return [null, data];
  } catch (error) {
    const { message, stack } = error as Error;
    return [{ message, stack, instance: error }, null];
  }
}

/**
 * Executes a synchronous function and captures any thrown errors.
 *
 * @template T - The type of the return value of the function.
 * @param {cb<T>} fn - The function to be executed.
 * @returns {TryResult<T>} - An array containing the error object and the return value of the function.
 */
export function trySync<T>(fn: cb<T>): TryResult<T> {
  try {
    const data = fn();
    return [null, data];
  } catch (error) {
    const { message, stack } = error as Error;
    return [{ message, stack, instance: error }, null];
  }
}
