# defered-branch 🚦

A tiny TypeScript/JavaScript utility for deferred branching logic.  
It provides a small, chainable API to register conditional branches and two kinds of "no-match" handlers: one that runs immediately when no branch was matched, and another that runs later when you call `run()`.

For more awesome packages, check out [my homepage💛](https://baendlorel.github.io/?repoType=npm)

## Highlights ✨

- Chainable API for registering branches
- Only the last matched branch is executed
- Immediate `nomatch` handler (runs instantly when no branch matched)
- Deferred `deferedNomatch` handler (runs when `run()` is invoked)
- TypeScript declarations included

## Installation 📦

```bash
pnpm add defered-branch
# or
npm install defered-branch
```

## Export / Import 🚀

The package exports a factory named `deferedBranch` (note the spelling):

```ts
import { deferedBranch } from 'defered-branch';
```

## Basic Usage

```ts
import { deferedBranch } from 'defered-branch';

// register branches - only the last matched branch will run
const b = deferedBranch()
  .add(false, () => 'A')
  .add(true, () => 'B');

console.log(b.run()); // 'B'
```

## nomatch vs deferedNomatch

There are two ways to handle the case when no branch matches:

- `nomatch(handler: Fn)` — runs the handler immediately if no branch has been matched yet. Note: if `nomatch` runs the handler immediately, later calls to `add(true, ...)` will not retroactively affect that call.
- `deferedNomatch(handler: Fn)` — registers a handler that will be executed when `run()` is called and no branch matched.

Examples:

```ts
import { deferedBranch } from 'defered-branch';

// nomatch runs immediately when invoked if no branch matched
deferedBranch()
  .add(false, () => 'x')
  .nomatch(() => console.log('immediate nomatch')) // prints now
  .add(true, () => console.log('will not be printed')); // ignored for the already-called nomatch

// deferedNomatch runs when run() is called
const b2 = deferedBranch()
  .add(false, () => 'x')
  .deferedNomatch(() => 'deferred fallback');

console.log(b2.run()); // 'deferred fallback'
```

## API Reference 📚

All functions accept a `Fn` type: `type Fn = (...args: unknown[]) => unknown`.

### `deferedBranch(): DeferBranch`

Create a new `DeferBranch` instance.

### `add(condition: boolean, branch: Fn): DeferBranch`

Register a branch. If `condition` is true the provided `branch` becomes the current matched branch. Later `add(true, ...)` calls will override the matched branch.

Throws `TypeError` if `branch` is not a function.

### `nomatch(handler: Fn): DeferBranch`

If no branch has been matched when this is called, the `handler` is invoked immediately. This is useful for side-effects that should run right away when a branch is absent. Returns the instance for chaining. Throws `TypeError` when `handler` is not a function.

### `deferedNomatch(handler: Fn): DeferBranch`

Register a handler to be executed by `run()` if no branch matched. Unlike `nomatch`, this does not run immediately — it defers execution until `run()`.

### `run(...args: unknown): unknown`

Execute the matched branch and return its value. If no branch matched but a `deferedNomatch` handler was set, returns the handler's return value. Returns `undefined` if neither exists.

`args` will be passed to the matched branch or the `deferedNomatch` handler when they are invoked.

## Types & Distribution

- Types are included (`"types": "./dist/index.d.ts"` in package.json).
- The package entrypoint is an ESM module at `./dist/index.mjs`.

## Error Handling ⚠️

- `TypeError` is thrown if a non-function is passed as a branch or handler.

## Author & License

- Author: Kasukabe Tsumugi (<futami16237@gmail.com>)
- License: MIT
