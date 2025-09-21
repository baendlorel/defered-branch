export class DeferBranchAllDynamic<
  BranchFn extends AnyFn,
  NoMatchFn extends AnyFn,
  ConditionFn extends AnyFn = Predicate<BranchFn>,
> {
  /**
   * & Compress conditions and branches into a single array since they are paired
   */
  private _condranches: AnyFn[] = [];
  private _branches: BranchFn[] = [];
  private _nomatch: NoMatchFn | null = null;

  /**
   * Add a new entry
   * - **All truthy branches will be executed**.
   * @param condition the condition to match
   * @param branch the branch to run when matched
   * @returns this
   */
  add(condition: ConditionFn, branch: BranchFn): this {
    if (typeof condition !== 'function') {
      throw new TypeError('DeferBranch: condition must be a function');
    }
    if (typeof branch !== 'function') {
      throw new TypeError('DeferBranch: branch must be a function');
    }

    this._condranches.push(condition, branch);
    return this;
  }

  /**
   * When calling `this.predicate` and no branch matched, run this handler
   * @param handler handle the exhausted case
   * @returns this
   */
  nomatch(handler: AnyFn): this {
    if (typeof handler !== 'function') {
      throw new TypeError('DeferBranch: handler must be a function');
    }

    this._nomatch = handler as NoMatchFn;
    return this;
  }

  /**
   * Run the conditions to find all matched branches
   */
  predicate(...args: Parameters<ConditionFn>): void {
    const len = this._condranches.length;
    for (let i = 0; i < len; i += 2) {
      if (this._condranches[i]()) {
        this._branches.push(this._condranches[i + 1] as BranchFn);
      }
    }

    if (this._nomatch && this._branches.length === 0) {
      this._nomatch.apply(this, args);
    }
  }

  /**
   * Execute all matched branches in order of addition
   * @param args arguments to pass to the matched branches
   */
  run(...args: Parameters<BranchFn>): ReturnType<BranchFn> | undefined {
    const len = this._branches.length;
    if (len === 0) {
      return;
    }
    for (let i = 0; i < len; i++) {
      this._branches[i].apply(null, args);
    }
  }
}
