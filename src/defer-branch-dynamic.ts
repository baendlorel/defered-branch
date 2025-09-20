export class DeferBranchDynamic<BranchFn extends AnyFn, NoMatchFn extends AnyFn = AnyFn> {
  /**
   * & Compress conditions and branches into a single array since they are paired
   */
  private _condranches: AnyFn[] = [];
  private _branch: BranchFn | null = null;
  private _nomatch: NoMatchFn | null = null;

  /**
   * Add a new entry
   * - will **override** the previous matched branch
   * @param condition the condition to match
   * @param branch the branch to run when matched
   * @returns this
   */
  add(condition: Predicate<BranchFn>, branch: BranchFn): DeferBranchDynamic<BranchFn, NoMatchFn> {
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
  nomatch(handler: AnyFn): DeferBranchDynamic<BranchFn, NoMatchFn> {
    if (typeof handler !== 'function') {
      throw new TypeError('DeferBranch: handler must be a function');
    }

    this._nomatch = handler as NoMatchFn;
    return this;
  }

  /**
   * Run the condition to find the first matched branch
   */
  predicate(...args: Parameters<BranchFn>): void {
    const len = this._condranches.length;
    for (let i = 0; i < len; i += 2) {
      if (this._condranches[i]()) {
        this._branch = this._condranches[i + 1] as BranchFn;
        return;
      }
    }

    this._nomatch?.apply(this, args);
  }

  /**
   * If some branch matched, return its returnValue
   * - if no branch matched, return the nomatch handler returnValue
   * - if no branch matched and no nomatch handler, return undefined
   * @param args arguments to pass to the matched branch or nomatch handler
   */
  run(...args: Parameters<BranchFn>): ReturnType<BranchFn> | undefined {
    return this._branch?.apply(this, args);
  }
}
