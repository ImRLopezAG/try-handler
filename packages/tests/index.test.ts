import assert from 'node:assert';
import { describe, it } from 'node:test';
import { tryAsync, trySync } from 'try-handler';

describe('tryAsync', () => {
  it('should return data and null when the function is successful', async () => {
    const [data, error] = await tryAsync(async () =>
      Promise.resolve('Hello, world!')
    );
    assert.strictEqual(data, 'Hello, world!');
    assert.strictEqual(error, null);
  });
  it('should return null and error message when the function throws an error', async () => {
    const [data, error] = await tryAsync(async () => {
      throw new Error('Something went wrong!');
    });
    assert.strictEqual(data, null);
    assert.strictEqual(error, 'Something went wrong!');
  });

  it('should return data and null when the function is successful', async () => {
    const [data, error] = trySync(() => 'Hello, world!');
    assert.strictEqual(data, 'Hello, world!');
    assert.strictEqual(error, null);
  });

  it('should return null and error message when the function throws an error', async () => {
    const [data, error] = trySync(() => {
      throw new Error('Something went wrong!');
    });
    assert.strictEqual(data, null);
    assert.strictEqual(error, 'Something went wrong!');
  });

  it('should return null and error message when the function throws an error', async () => {
    const [data, error] = trySync(() => {
      throw 'Something went wrong!';
    });
    assert.strictEqual(data, null);
    assert.strictEqual(error, 'Something went wrong!');
  });

  it('should return null and error message when the function throws an error', async () => {
    const [data, error] = trySync(() => {
      throw 404;
    });
    assert.strictEqual(data, null);
    assert.strictEqual(error, '404');
  });

  it('should return null and error message when the function throws an error', async () => {
    const [data, error] = trySync(() => {
      throw null;
    });
    assert.strictEqual(data, null);
    assert.strictEqual(error, 'null');
  });

  it('should return TODOS and null when the function is successful calling an API', async () => {
    const [data, error] = await tryAsync<
      {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
      }[]
    >(async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      return response.json();
    });
    assert.strictEqual(error, null);
    if (data) {
      assert.strictEqual(data.length, 200);
    }
  });
});
