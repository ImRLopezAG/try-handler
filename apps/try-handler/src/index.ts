type TryResult<T> = [string | null, T | null,];

export async function tryAsync <T>(
  fn: () => Promise<T>,
): Promise<TryResult<T>> {
  try {
    const data = await fn();
    return [null, data];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return [errorMessage, null];
  }
};
export function trySync <T>(fn: () => T): TryResult<T> {
  try {
    const data = fn();
    return [null, data];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return [errorMessage, null];
  }
};