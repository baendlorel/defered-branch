import { expect, describe, it } from 'vitest';
import { deferedBranch } from '../src/index.js';

describe('deferedBranch', () => {
  it('should run matched branch', () => {
    const fn = () => 'matched';
    const branch = deferedBranch().add(true, fn);
    expect(branch.run()).toBe('matched');
  });

  it('nomatch should run immediately when no branch matched', () => {
    const called: string[] = [];
    // nomatch runs immediately when no branch matched
    deferedBranch()
      .add(false, () => called.push('branch'))
      .nomatch(() => called.push('nomatch'));

    expect(called).toEqual(['nomatch']);
  });

  it('deferedNomatch should run when run() is called', () => {
    const branch = deferedBranch()
      .add(false, () => 'no')
      .deferedNomatch(() => 'fallback');

    expect(branch.run()).toBe('fallback');
  });

  it('should return undefined if no branch and no nomatch handlers', () => {
    const branch = deferedBranch();
    expect(branch.run()).toBeUndefined();
  });

  it('should override previous matched branch', () => {
    const fn1 = () => 'first';
    const fn2 = () => 'second';
    const branch = deferedBranch().add(true, fn1).add(true, fn2);
    expect(branch.run()).toBe('second');
  });

  it('should throw TypeError if branch is not a function', () => {
    expect(() => deferedBranch().add(true, 123 as any)).toThrow(TypeError);
  });

  it('should throw TypeError if nomatch is not a function', () => {
    expect(() => deferedBranch().nomatch(123 as any)).toThrow(TypeError);
  });
});
