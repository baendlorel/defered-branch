export class DeferedBranchAll<BranchFn extends AnyFn, NoMatchFn extends AnyFn> {
  private _branches: BranchFn[] = [];

  /**
   * Add a new entry
   * - **All truthy branches will be executed**.
   * @param condition the condition to match
   * @param branch the branch to run when matched
   * @returns this
   */
  add(condition: boolean, branch: BranchFn): this {
    if (typeof branch !== 'function') {
      throw new TypeError('DeferBranch: branch must be a function');
    }

    // & Preventing later branches from overwriting earlier matched branch
    if (condition) {
      this._branches.push(branch);
    }
    return this;
  }

  /**
   * Register a handler to be called when no branch matched
   * - This will be called **instantly and ignores later matched branches**
   * @param handler handle the exhausted case
   * @returns this
   */
  nomatch(handler: NoMatchFn): this {
    if (typeof handler !== 'function') {
      throw new TypeError('DeferBranch: branch must be a function');
    }

    if (this._branches.length === 0) {
      handler();
    }

    return this;
  }

  /**
   * Execute all matched branches in order of addition
   * @param args arguments to pass to the matched branch or nomatch handler
   */
  run(...args: Parameters<BranchFn>): void {
    const len = this._branches.length;
    if (len === 0) {
      return;
    }
    for (let i = 0; i < len; i++) {
      this._branches[i].apply(null, args);
    }
  }
}
