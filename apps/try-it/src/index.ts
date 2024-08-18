export const tryAsync = async <T>(
  fn: () => Promise<T>,
): Promise<[T | null, string | null]> => {
  try {
    const data = await fn();
    return [data, null];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return [null, errorMessage];
  }
};
export const trySync = <T>(fn: () => T): [T | null, string | null] => {
  try {
    const data = fn();
    return [data, null];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return [null, errorMessage];
  }
};