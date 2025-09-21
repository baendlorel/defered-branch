# Defered Branch 🌿

For more awesome packages, check out [my homepage💛](https://baendlorel.github.io/?repoType=npm)

> Sometimes we need to judge something with multiple cases, but the main job should be done later. So we have Defered Branch! ✨

A TypeScript/JavaScript library that provides elegant deferred conditional branching with four powerful variants: **defered-branch** for immediate execution, **defered-branch-dynamic** for reusable logic patterns, **defered-branch-all** for executing all matching branches immediately, and **defered-branch-all-dynamic** for reusable multi-branch execution.

## 🚀 Features

- 🎯 **Four Execution Models**: Choose between single-match vs all-match, and immediate vs dynamic reusable logic
- 🔒 **Type Safe**: Full TypeScript support with proper type inference
- 🪶 **Lightweight**: Zero dependencies, minimal footprint
- 🧩 **Flexible**: Works with any function signature and return types
- 📦 **Type Annotation**: Full type annotation supported for the exported functions. You can customize handler's type of branch/condition/nomatch.

## 📦 Installation

```bash
npm install defered-branch
# or
pnpm add defered-branch
```

## 🌟 When to Use Which?

### `deferedBranch` - Single-Match Immediate Execution 🏃‍♂️

Perfect for scenarios where you need to evaluate conditions **once** and execute **the first match** immediately:

- One-time conditional flows with single outcome
- Static condition evaluation where only one branch should run

### `deferedBranchDynamic` - Single-Match Reusable Logic 🔄

Ideal when you need to **reuse** the same branching logic multiple times with different inputs, executing **only the first match**:

- Event handlers with varying states
- Repeated conditional logic with dynamic data where only one action is needed

### `deferedBranchAll` - Multi-Match Immediate Execution 🎯

Perfect for scenarios where you need to evaluate conditions **once** and execute **all matching branches** immediately:

- Notification systems where multiple handlers should trigger
- Validation systems where all applicable rules should run
- Event handling where multiple listeners should respond

### `deferedBranchAllDynamic` - Multi-Match Reusable Logic 🌊

Ideal when you need to **reuse** branching logic that executes **all matching branches** with dynamic conditions:

- Plugin systems where multiple plugins may handle the same event
- Middleware chains where multiple handlers should process the same request
- Observer patterns where multiple observers need to react to state changes

## 📚 Usage Examples

### Basic deferedBranch Usage

```typescript
import { deferedBranch } from 'defered-branch';

// Steps to use:
// 1. Create instance
const branch = deferedBranch();

// 2. Add conditional branches
branch
  .add(user.role === 'admin', () => 'Access granted to admin panel')
  .add(user.role === 'user', () => 'Access granted to user dashboard')
  .add(user.role === 'guest', () => 'Limited access granted');

// 3. Handle no-match case (optional)
branch.nomatch(() => 'Access denied');

// some other logic... like validate other arguments

// 4. Execute and get result
const result = branch.run();
console.log(result); // Output based on user.role
```

### Advanced deferedBranch with Parameters

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

### deferedBranchDynamic for Reusable Logic

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

### Real-world Example: Theme Switching

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

---

Made with ❤️ by [Kasukabe Tsumugi](https://github.com/baendlorel) (´｡• ᵕ •｡`) ♡
