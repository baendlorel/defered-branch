# Defered Branch 🌿

A lightweight library providing a if-else like branch, but with deferred execution. You can evaluate conditions now and execute the matched branch later.

For more awesome packages, check out [my homepage💛](https://baendlorel.github.io/?repoType=npm)

## 🚀 Features

- 🎯 **Four Execution Patterns**: Single/all-match × immediate/dynamic logic
- 🔒 **Type Safe**: Full TypeScript support with type inference
- 🪶 **Lightweight**: Zero dependencies, minimal footprint
- 🧩 **Flexible**: Works with any function signature
- 📦 **Generic**: Customizable branch, condition, and nomatch handler types

## ⏲️ Change Log (Symplified)

### 2.2.1

- Fix: Clear matched branch after execution to prevent stale state issues.

### 2.2.0

- Add `deferedBranchAll` and `deferedBranchAllDynamic` for multi-match scenarios.
- Fix documentation typos.

## 📦 Installation

```bash
npm install defered-branch
# or
pnpm add defered-branch
```

## 🌟 API Overview

### `deferedBranch` - Single-Match Immediate 🏃‍♂️

Evaluate conditions once, execute first match immediately.

**Use cases:** One-time conditional flows, static condition evaluation

### `deferedBranchDynamic` - Single-Match Reusable 🔄

Reusable branching logic, execute first match dynamically.

**Use cases:** Event handlers with varying states, repeated conditional logic

### `deferedBranchAll` - Multi-Match Immediate 🎯

Evaluate conditions once, execute all matches immediately.

**Use cases:** Notification systems, validation rules, multiple event listeners

### `deferedBranchAllDynamic` - Multi-Match Reusable 🌊

Reusable branching logic, execute all matches dynamically.

**Use cases:** Plugin systems, middleware chains, observer patterns

## 📚 Usage Examples

### Basic `deferedBranch`

```typescript
const calculator = deferedBranch<(a: number, b: number) => number>();

calculator
  .add(operation === 'add', (a, b) => a + b)
  .add(operation === 'multiply', (a, b) => a * b)
  .add(operation === 'divide', (a, b) => a / b)
  .nomatch(() => {
    throw new Error('Unknown operation');
  });

const result = calculator.run(10, 5); // Returns calculated result
```

### Reusable Logic with `deferedBranchDynamic`

```typescript
import { deferedBranchDynamic } from 'defered-branch';

// Steps to use:
// 1. Create instance
const statusHandler = deferedBranchDynamic<(message: string) => void>();

// 2. Add predicate-based branches
statusHandler
  .add(
    () => server.status === 'online',
    (msg) => logger.info(`✅ ${msg}`)
  )
  .add(
    () => server.status === 'maintenance',
    (msg) => logger.warn(`⚠️ ${msg}`)
  )
  .add(
    () => server.status === 'offline',
    (msg) => logger.error(`❌ ${msg}`)
  );

// 3. Add fallback handler
statusHandler.nomatch((msg) => logger.debug(`🤔 Unknown status: ${msg}`));

// 4. Use repeatedly with different conditions
statusHandler.predicate(); // Evaluates current server.status
statusHandler.run('Server health check completed');

// Later, when server.status changes...
statusHandler.predicate(); // Re-evaluates with new status
statusHandler.run('Status updated');
```

### deferedBranchAll for Multi-Match Execution

_Same as deferedBranch_

### deferedBranchAllDynamic

_Same as deferedBranchDynamic_

### Real-world Example

#### Theme Switching

```typescript
const themeHandler = deferedBranchDynamic<() => void>();

themeHandler
  .add(
    () => preferences.theme === 'dark',
    () => applyDarkTheme()
  )
  .add(
    () => preferences.theme === 'light',
    () => applyLightTheme()
  )
  .add(
    () => preferences.theme === 'auto',
    () => applySystemTheme()
  )
  .nomatch(() => {
    // usually handles parameter validations
    throw new TypeError('Invalid theme preference');
  });

// Reuse whenever preferences change
function onConfigChange() {
  themeHandler.predicate();
  xxxHandler.predicate();
  yyyHandler.predicate();

  // some other logic...create some objects..
  // some other logic...run some funtions...

  themeHandler.run();
  xxxHandler.run();
  yyyHandler.run();
}
```

#### `h` function

[This is a simplied example from package **KT.js**](https://www.npmjs.com/package/kt.js)

In this section, we can see that element creation separates judgement and dealing of `attr` and `content`. With out this package, we should judge 2 times and the code would be too long for one .ts file.

```typescript
const attrBranch = deferedBranchDynamic<BranchFn, NoMatchFn, PredicateFn>()
  .add((_, attr) => typeof attr === 'string', attrIsString)
  .add((_, attr) => typeof attr === 'object' && attr !== null, attrIsObject)
  .nomatch(invalidAttrHandler);
const contentBranch = __Same_As_AttrBranch__;

function h<T extends HTMLTag>(
  tag: T,
  attr: RawAttribute = '',
  content: RawContent = ''
): HTMLElement<T> {
  if (typeof tag !== 'string') {
    throw new TypeError('[__NAME__:h] tagName must be a string.');
  }
  attrBranch.predicate(null, attr);
  contentBranch.predicate(null, content);

  // create element
  const el = document.createElement(tag) as HTMLElement<T>;
  // ... some element enhancement logic ...

  attrBranch.run(element, attr);
  contentBranch.run(element, content);

  // ... other logic ...
}
```

## 🔧 API Reference

### deferedBranch()

Creates a new deferred branch instance for immediate execution scenarios.

#### Methods

##### `.add(condition: boolean, branch: Function): DeferBranch`

- Adds a conditional branch that executes if condition is `true`
- First-match wins: the first truthy branch will be selected; later entries are ignored
- Returns the instance for chaining

##### `.nomatch(handler: Function): DeferBranch`

- Sets an immediate fallback handler
- **Executes instantly** if no previous branch matched
- **Ignores** later matched branches

##### `.run(...args): any`

- Executes the matched branch or fallback handler
- Passes arguments to the executed function
- Returns the function's return value or `undefined`

### deferedBranchDynamic()

Creates a new dynamic deferred branch instance for reusable logic patterns.

#### Methods

##### `.add(condition: Predicate, branch: Function): DeferBranchDynamic`

- Adds a predicate-based conditional branch
- `condition` is a function that returns boolean
- First-match wins: the first truthy branch will be selected; later entries are ignored

##### `.nomatch(handler: Function): DeferBranchDynamic`

- Sets a fallback handler for when no predicates match
- Executes during `.predicate()` evaluation

##### `.predicate(...args): void`

- Evaluates all conditions to find the first match
- Call this before `.run()` to update the matched branch
- Essential for dynamic behavior

##### `.run(...args): any`

- Executes the currently matched branch
- Returns the function's return value or `undefined`

### deferedBranchAll()

_Same as deferedBranch_

### deferedBranchAllDynamic()

_Same as deferedBranchDynamic_

## 🧾 Type Annotation

The factory functions `deferedBranch`, `deferedBranchDynamic`, `deferedBranchAll`, and `deferedBranchAllDynamic` are generic helpers. You can provide explicit type parameters to describe the branch function signature and the optional `nomatch` handler.

Below is an example using `deferedBranch`:

```typescript
import { deferedBranch } from 'defered-branch';

// Here we declare that branches accept a message (string) and return void.
// The factory signature is: deferedBranch<BranchFn, NoMatchFn>()
const handler = deferedBranch<(msg: string) => void, () => void>();

handler
  .add(
    process.env.STATUS === 'ok',
    (msg) => console.log('OK:', msg) // this is restricted by `(msg: string) => void`
  )
  .add(
    process.env.STATUS === 'warn',
    (msg) => console.warn('WARN:', msg) // this is restricted by `(msg: string) => void`
  )
  .nomatch(
    () => console.debug('unknown') // this is restricted by `() => void`
  );

handler.run('hello world'); // input args for `run` are restricted by `(msg: string) => void`
```

Notes:

- If you omit generic parameters TypeScript will fall back to `AnyFn` and inference is weaker.
- `BranchFn` defines the parameter types that `.run(...)` accepts and what each branch receives.
- `NoMatchFn` defines the signature of the `nomatch`/`deferedNomatch` handler.

Example: calculator with typed branches

```typescript
const calc = deferedBranchDynamic<(a: number, b: number) => number, () => never>();

calc
  .add(
    () => operation === 'add',
    (a, b) => a + b
  )
  .add(
    () => operation === 'mul',
    (a, b) => a * b
  )
  .nomatch(() => {
    throw new Error('unknown operation');
  });

calc.predicate();
const result = calc.run(2, 3); // typed as number | undefined
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 🦋 Trivia

[**KT.js**](https://www.npmjs.com/package/kt.js) is the reason of this package's birth. It uses `deferedBranchDynamic` internally to handle attribute and content processing in a clean, reusable way.

---

Made with ❤️ by [Kasukabe Tsumugi](https://github.com/baendlorel) (´｡• ᵕ •｡`) ♡
