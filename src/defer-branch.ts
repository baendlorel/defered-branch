export class DeferedBranch<BranchFn extends AnyFn, NoMatchFn extends AnyFn> {
  private _branch: BranchFn | null = null;

  /**
   * Add a new entry
   * - **First truthy first served**.
   * @param condition the condition to match
   * @param branch the branch to run when matched
   * @returns this
   */
  add(condition: boolean, branch: BranchFn): this {
    if (typeof branch !== 'function') {
      throw new TypeError('DeferBranch: branch must be a function');
    }

    // & Preventing later branches from overwriting earlier matched branch
    if (condition && !this._branch) {
      this._branch = branch;
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

    if (!this._branch) {
      handler();
    }

    return this;
  }

  /**
   * Execute the first matched branch in order of addition
   * @param args arguments to pass to the matched branch or nomatch handler
   * @returns the return value of the matched branch or void
   */
  run(...args: Parameters<BranchFn>): ReturnType<BranchFn> | void {
    if (this._branch) {
      return this._branch.apply(null, args);
    }
  }
}
