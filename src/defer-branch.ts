export class DeferBranch<BranchFn extends AnyFn, NoMatchFn extends AnyFn = AnyFn> {
  private _branch: BranchFn | null = null;
  private _nomatch: NoMatchFn | null = null;

  /**
   * Add a new entry
   * - will **override** the previous matched branch
   * @param condition the condition to match
   * @param branch the branch to run when matched
   * @returns this
   */
  add(condition: boolean, branch: BranchFn): DeferBranch<BranchFn> {
    if (typeof branch !== 'function') {
      throw new TypeError('DeferBranch: branch must be a function');
    }

    if (condition) {
      this._branch = branch;
    }
    return this;
  }

  /**
   * When no branch matched, run this handler
   * - This will be called **instantly** and **ignores later matched branches**
   * @param handler handle the exhausted case
   * @returns this
   */
  nomatch(handler: AnyFn): DeferBranch<BranchFn> {
    if (typeof handler !== 'function') {
      throw new TypeError('DeferBranch: branch must be a function');
    }

    if (!this._branch) {
      handler();
    }

    return this;
  }

  /**
   * When calling `this.run` and no branch matched, run this handler
   * @param handler handle the exhausted case
   * @returns this
   */
  deferedNomatch(handler: NoMatchFn): DeferBranch<BranchFn> {
    if (typeof handler !== 'function') {
      throw new TypeError('DeferBranch: handler must be a function');
    }

    this._nomatch = handler;

    return this;
  }

  /**
   * If some branch matched, return its returnValue
   * - if no branch matched, return the nomatch handler's returnValue
   * - if no branch matched and no nomatch handler, return undefined
   *
   * > Note: Although args are for the matched branch, they will also be passed to nomatch handler
   * @param args arguments to pass to the matched branch or nomatch handler
   */
  run(...args: Parameters<BranchFn>): ReturnType<BranchFn> | ReturnType<NoMatchFn> | undefined {
    if (this._branch) {
      return this._branch.apply(null, args);
    }

    if (this._nomatch) {
      return this._nomatch.apply(null, args);
    }
  }
}
