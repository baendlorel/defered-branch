import { DeferedBranch } from './defered-branch/default.js';
import { DeferedBranchDynamic } from './defered-branch/dynamic.js';
import { DeferedBranchAllDynamic } from './defered-branch/all-dynamic.js';
import { DeferedBranchAll } from './defered-branch/all.js';

/**
 * ## Steps to use
 * 1. const a = deferedBranch()
 * 2. add branches by a.add(condition, branch)
 * 3. (optional) add defered nomatch handler, or add and run at the same time by a.nomatch(handler)
 * 4. ...run some other logic
 * 5. run this branch by a.run();
 *
 * ## Type Annotation (optional)
 * ```ts
 *   type BranchFn = (a: number) => void;
 *   type NoMatchFn = () => void;
 *   const a = deferedBranch<BranchFn, NoMatchFn>();
 *
 *   // then we have restrictions:
 *   a.add(true, someFn satisfies BranchFn);
 *   a.nomatch(otherFn satisfies NoMatchFn);
 *
 *   // some other logic
 *
 *   a.run(...args); // input args are restricted to Parameters<BranchFn>
 * ```
 *
 * __PKG_INFO__
 */
export const deferedBranch = <BranchFn extends AnyFn = AnyFn, NoMatchFn extends AnyFn = AnyFn>() =>
  new DeferedBranch<BranchFn, NoMatchFn>();

/**
 * ## Steps to use
 * 1. const a = deferedBranchDynamic()
 * 2. add branches by a.add(condition, branch)
 * 3. add nomatch handler by a.nomatch(handler)
 * 4. call a.predicate(...) to find the matched branch
 * 5. ...run some other logic
 * 6. run this branch by a.run();
 *
 * ## Type Annotation (optional)
 * ```ts
 *   type BranchFn = (a: number) => void;
 *   type NoMatchFn = () => void;
 *   // optional, you can customize the condition function type
 *   type ConditionFn = Predicate<BranchFn>;
 *   const a = deferedBranch<BranchFn, NoMatchFn, ConditionFn>();
 *
 *   // then we have restrictions:
 *   a.add(someFn satisfies ConditionFn, secondFn satisfies BranchFn);
 *   a.nomatch(thirdFn satisfies NoMatchFn);
 *
 *   // some other logic
 *
 *   a.predicate(...args);
 *
 *   // some other logic
 *
 *   a.run(...args); // input args are restricted to Parameters<BranchFn>
 * ```
 *
 * __PKG_INFO__
 */
export const deferedBranchDynamic = <
  BranchFn extends AnyFn = AnyFn,
  NoMatchFn extends AnyFn = AnyFn,
  ConditionFn extends AnyFn = Predicate<BranchFn>,
>() => new DeferedBranchDynamic<BranchFn, NoMatchFn, ConditionFn>();

/**
 * ## Steps to use
 * 1. const a = deferedBranch()
 * 2. add branches by a.add(condition, branch)
 * 3. (optional) add defered nomatch handler, or add and run at the same time by a.nomatch(handler)
 * 4. ...run some other logic
 * 5. run this branch by a.run();
 *
 * ## Type Annotation (optional)
 * ```ts
 *   type BranchFn = (a: number) => void;
 *   type NoMatchFn = () => void;
 *   const a = deferedBranch<BranchFn, NoMatchFn>();
 *
 *   // then we have restrictions:
 *   a.add(true, someFn satisfies BranchFn);
 *   a.nomatch(otherFn satisfies NoMatchFn);
 *
 *   // some other logic
 *
 *   a.run(...args); // input args are restricted to Parameters<BranchFn>
 * ```
 *
 * __PKG_INFO__
 */
export const deferedBranchAll = <
  BranchFn extends AnyFn = AnyFn,
  NoMatchFn extends AnyFn = AnyFn,
>() => new DeferedBranchAll<BranchFn, NoMatchFn>();

/**
 * ## Steps to use
 * 1. const a = deferedBranchDynamic()
 * 2. add branches by a.add(condition, branch)
 * 3. add nomatch handler by a.nomatch(handler)
 * 4. call a.predicate(...) to find the matched branch
 * 5. ...run some other logic
 * 6. run this branch by a.run();
 *
 * ## Type Annotation (optional)
 * ```ts
 *   type BranchFn = (a: number) => void;
 *   type NoMatchFn = () => void;
 *   // optional, you can customize the condition function type
 *   type ConditionFn = Predicate<BranchFn>;
 *   const a = deferedBranch<BranchFn, NoMatchFn, ConditionFn>();
 *
 *   // then we have restrictions:
 *   a.add(someFn satisfies ConditionFn, secondFn satisfies BranchFn);
 *   a.nomatch(thirdFn satisfies NoMatchFn);
 *
 *   // some other logic
 *
 *   a.predicate(...args);
 *
 *   // some other logic
 *
 *   a.run(...args); // input args are restricted to Parameters<BranchFn>
 * ```
 *
 * __PKG_INFO__
 */
export const deferedBranchAllDynamic = <
  BranchFn extends AnyFn = AnyFn,
  NoMatchFn extends AnyFn = AnyFn,
  ConditionFn extends AnyFn = Predicate<BranchFn>,
>() => new DeferedBranchAllDynamic<BranchFn, NoMatchFn, ConditionFn>();
