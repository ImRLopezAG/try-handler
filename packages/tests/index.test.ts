import assert from 'node:assert'
import { describe, it } from 'node:test'
import { tryAsync, trySync } from 'try-handler'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

describe('tryAsync', () => {
  it('should return data and null when the function is successful', async () => {
    const [error, data] = await tryAsync(async () =>
      Promise.resolve('Hello, world!')
    )
    assert.strictEqual(data, 'Hello, world!')
    assert.strictEqual(error, null)
  })

  it('should return null and error message when the function throws an error', async () => {
    const [error, data] = await tryAsync(async () => {
      throw new Error('Something went wrong!')
    })
    assert.strictEqual(data, null)
    assert.strictEqual(error, 'Something went wrong!')
  })

  it('should return data and null when the function is successful', async () => {
    const [error, data] = trySync(() => 'Hello, world!')
    assert.strictEqual(data, 'Hello, world!')
    assert.strictEqual(error, null)
  })

  it('should return null and error message when the function throws an error', async () => {
    const [error, data] = trySync(() => {
      throw new Error('Something went wrong!')
    })
    assert.strictEqual(data, null)
    assert.strictEqual(error, 'Something went wrong!')
  })

  it('should return null and error message when the function throws an error', async () => {
    const [error, data] = trySync(() => {
      throw 'Something went wrong!'
    })
    assert.strictEqual(data, null)
    assert.strictEqual(error, 'Something went wrong!')
  })

  it('should return null and error message when the function throws an error', async () => {
    const [error, data] = trySync(() => {
      throw 404
    })
    assert.strictEqual(data, null)
    assert.strictEqual(error, '404')
  })

  it('should return null and error message when the function throws an error', async () => {
    const [error, data] = trySync(() => {
      throw null
    })
    assert.strictEqual(data, null)
    assert.strictEqual(error, 'null')
  })

  it('should return TODOS and null when the function is successful calling an API', async () => {
    const [error, data] = await tryAsync<Todo[]>(async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      )
      return await response.json()
    })
    assert.strictEqual(error, null)
    assert.strictEqual(data?.length, 200)
  })

  it('should return null and error message when the function throws an error calling an API', async () => {
    const [error, data] = await tryAsync<Todo>(async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/0'
      )
      if (!response.ok) {
        throw response.statusText
      }
      return await response.json()
    })
    assert.strictEqual(data, null)
    assert.strictEqual(error, 'Not Found')
  })
})
