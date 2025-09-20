import { DeferBranch } from './defer-branch.js';
import { DeferBranchDynamic } from './defer-branch-dynamic.js';

/**
 * ## Steps to use
 * 1. const a = deferedBranch()
 * 2. add branches by a.add(condition, branch)
 * 3. add defered nomatch handler, or add and run at the same time by a.nomatch(handler)
 * 4. run this branch by a.run();
 *
 * __PKG_INFO__
 */
export const deferedBranch = () => new DeferBranch();

/**
 * ## Steps to use
 * 1. const a = deferedBranchDynamic()
 * 2. add branches by a.add(condition, branch)
 * 3. add nomatch handler by a.nomatch(handler)
 * 4. call a.predicate(...) to find the matched branch
 * 5. run this branch by a.run();
 *
 * __PKG_INFO__
 */
export const deferedBranchDynamic = () => new DeferBranchDynamic();
