class DeferBranch {
  private _branch: Fn | null = null;
  private _nomatch: Fn | null = null;

  /**
   * Add a new entry
   * - will **override** the previous matched branch
   * @param condition the condition to match
   * @param branch the branch to run when matched
   * @returns this
   */
  add(condition: boolean, branch: Fn): DeferBranch {
    if (typeof branch !== 'function') {
      throw new TypeError('Branch must be a function');
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
  nomatch(handler: Fn): DeferBranch {
    if (typeof handler !== 'function') {
      throw new TypeError('Branch must be a function');
    }

    if (!this._branch) {
      handler();
    }

    return this;
  }

  /**
   * When no branch matched, run this handler
   * - Will be called when `run()` is called
   * @param handler handle the exhausted case
   * @returns this
   */
  deferedNomatch(handler: Fn): DeferBranch {
    if (typeof handler !== 'function') {
      throw new TypeError('Branch must be a function');
    }

    this._nomatch = handler;

    return this;
  }

  /**
   * If some branch matched, return its returnValue
   * - if no branch matched, return the nomatch handler returnValue
   * - if no branch matched and no nomatch handler, return undefined
   * @param args arguments to pass to the matched branch or nomatch handler
   */
  run(...args: unknown[]): unknown {
    if (this._branch) {
      return this._branch(...args);
    }

    if (this._nomatch) {
      return this._nomatch(...args);
    }
  }
}

/**
 * __PKG_INFO__
 */
export const deferedBranch = () => new DeferBranch();
