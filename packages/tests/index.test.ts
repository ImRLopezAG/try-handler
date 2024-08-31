import assert from 'node:assert';
import { describe, it } from 'node:test';
import { tryAsync, trySync } from 'try-handler';
import { styleText } from 'node:util';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type ForegroundColors =
  | 'black'
  | 'blackBright'
  | 'blue'
  | 'blueBright'
  | 'cyan'
  | 'cyanBright'
  | 'gray'
  | 'green'
  | 'greenBright'
  | 'grey'
  | 'magenta'
  | 'magentaBright'
  | 'red'
  | 'redBright'
  | 'white'
  | 'whiteBright'
  | 'yellow'
  | 'yellowBright';

const style = (color: ForegroundColors, text: string) =>
  styleText(['bold', 'underline'], styleText(color, text));

describe('tryAsync', () => {
  it('should return data and null when the function is successful', async () => {
    const [error, data] = await tryAsync(async () =>
      Promise.resolve('Hello, world!')
    );
    console.log(style('green', String(data)));
    assert.strictEqual(data, 'Hello, world!');
    assert.strictEqual(error, null);
  });

  it('should return null and error message when the function throws an error', async () => {
    const [error, data] = await tryAsync(async () => {
      throw new Error('Something went wrong!');
    });
    console.log(style('red', String(error)));
    assert.strictEqual(data, null);
    assert.strictEqual(error?.message, 'Something went wrong!');
  });

  it('should return TODOS and null when the function is successful calling an API', async () => {
    const [error, data] = await tryAsync<Todo[]>(async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      return await response.json();
    });
    console.log(style('green', String(data?.length)));
    assert.strictEqual(error, null);
    assert.strictEqual(data?.length, 200);
  });

  it('should return null and error message when the function throws an error calling an API', async () => {
    const [error, data] = await tryAsync<Todo>(async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/0'
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    });
    console.log(style('red', String(error?.message)));
    assert.strictEqual(data, null);
    assert.strictEqual(error?.message, 'Not Found');
  });
});

describe('trySync', () => {
  it('should return data and null when the function is successful', async () => {
    const [error, data] = trySync(() => 'Hello, world!');
    console.log(style('green', String(data)));
    assert.strictEqual(data, 'Hello, world!');
    assert.strictEqual(error, null);
  });

  it('should return null and error message when the function throws an error', async () => {
    const [error, data] = trySync(() => {
      throw new Error('Something went wrong!');
    });
    console.log(style('red', String(error)));
    assert.strictEqual(data, null);
    assert.strictEqual(error?.message, 'Something went wrong!');
  });

  it('should return null and error message when the function throws an error', async () => {
    const [error, data] = trySync(() => {
      throw new Error('Something went wrong!');
    });
    console.log(style('red', String(error)));
    assert.strictEqual(data, null);
    assert.strictEqual(error?.message, 'Something went wrong!');
  });

  it('should return null and error message when the function throws an error', async () => {
    const [error, data] = trySync(() => {
      throw new Error('404');
    });
    console.log(style('red', String(error)));
    assert.strictEqual(data, null);
    assert.strictEqual(error?.message, '404');
  });
});
