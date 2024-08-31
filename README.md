# Try Handler

Try handler is a powerful utility that wraps try-catch blocks in a function, allowing you to handle errors in a more elegant way, without the need to write try-catch blocks in your code.

## Installation

To install the utilities, you can use the following command:

```bash
npm install  try-handler
```

```bash
pnpm add  try-handler
```

```bash
yarn add try-handler
```

```bash
bun add try-handler
```

## Usage

The try-handler package provides two functions, `tryAsync` and `trySync`, which allow you to handle errors in asynchronous and synchronous functions, respectively. The functions return an array with two elements, the first element is the error object, and the second element is the data returned by the function. These functions are useful when you want to handle errors in a more elegant way, without the need to write try-catch blocks in your code.

### Types

```ts
type TryResult<T> = [ErrorHandling, T | undefined];
type Callback<T> = () => T;

interface ErrorHandling {
  message: string;
  instance: {
    stack: string | undefined;
    name: string;
    cause: unknown;
  };
}
```

### Examples

```javascript
import { tryAsync, trySync } from 'try-handler';

const asyncGoodFunction = async () => Promise.resolve('Hello World');
const asyncBadFunction = async () =>
  Promise.reject(new Error('An error occurred'));

const syncGoodFunction = () => 'Hello World';
const syncBadFunction = () => {
  throw new Error('An error occurred');
};

const [error, data] = await tryAsync(asyncGoodFunction);
console.log(data); // Hello World
console.log(error); // null

const [error, data] = await tryAsync(asyncBadFunction);
console.log(data); // null
console.log(error.message); // Error: An error occurred

const [error, data] = trySync(syncGoodFunction);
console.log(data); // Hello World
console.log(error); // null

const [error, data] = trySync(syncBadFunction);
console.log(data); // null
console.log(error.message); // An error occurred
```

### 🛠️ Tools

[![Typescript](https://img.shields.io/badge/Typescript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)](https://prettier.io/)
[![NodeJS](https://img.shields.io/badge/NodeJS-339933?logo=node.js&logoColor=white)](https://nodejs.org/es/)

## Authors

[![ImRLopezAG](https://img.shields.io/badge/ImRLopezAG-000000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ImRLopezAG)

## 🔗 Links

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://imrlopez.vercel.app)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/angel-gabriel-lopez/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/imr_lopez)
