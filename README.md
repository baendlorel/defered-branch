# defered-branch 🚦

A tiny TypeScript/JavaScript library for deferred branching logic.  
Easily manage conditional execution and fallback handlers in a clean, chainable way!

For more awesome packages, check out [my homepage💛](https://baendlorel.github.io/?repoType=npm)

## Features ✨

- Chainable API for adding branches
- Only the last matched branch is executed
- Custom handler for unmatched cases
- TypeScript support
- Lightweight and dependency-free

## Installation 📦

```bash
pnpm add defered-branch
# or
npm install defered-branch
```

## Usage 🚀

```ts
import { deferBranch } from 'defered-branch';

const result = deferBranch()
  .add(false, () => 'not this')
  .add(true, () => 'this branch runs!')
  .nomatch(() => 'no branch matched')
  .run();

console.log(result); // 'this branch runs!'
```

## API Reference 📚

### `deferBranch(): DeferBranch`

Creates a new branch handler.

### `add(condition: boolean, branch: () => any): this`

Adds a branch. If `condition` is true, this branch will be set as the one to run.  
Multiple calls will override the previous matched branch.

### `nomatch(handler: () => any): this`

Sets a handler to run if no branch matches.

### `run(): any`

Executes the matched branch, or the nomatch handler if none matched.  
Returns `undefined` if neither is set.

## Example 🧩

```ts
const branch = deferBranch()
  .add(false, () => 'A')
  .add(false, () => 'B')
  .nomatch(() => 'Fallback!');

console.log(branch.run()); // 'Fallback!'
```

## Error Handling ⚠️

- Throws `TypeError` if branch or nomatch handler is not a function.

## License 📄

MIT
