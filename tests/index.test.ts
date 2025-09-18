import { expect, describe, it } from 'vitest';
import { deferBranch } from '../src/index.js';

describe('deferBranch', () => {
  it('should run matched branch', () => {
    const fn = () => 'matched';
    const branch = deferBranch().add(true, fn);
    expect(branch.run()).toBe('matched');
  });

  it('should run nomatch handler if no branch matched', () => {
    const nomatch = () => 'no match';
    const branch = deferBranch()
      .add(false, () => 'should not run')
      .nomatch(nomatch);
    expect(branch.run()).toBe('no match');
  });

  it('should return undefined if no branch and no nomatch', () => {
    const branch = deferBranch();
    expect(branch.run()).toBeUndefined();
  });

  it('should override previous matched branch', () => {
    const fn1 = () => 'first';
    const fn2 = () => 'second';
    const branch = deferBranch().add(true, fn1).add(true, fn2);
    expect(branch.run()).toBe('second');
  });

  it('should throw TypeError if branch is not a function', () => {
    // @ts-expect-error
    expect(() => deferBranch().add(true, 123)).toThrow(TypeError);
  });

  it('should throw TypeError if nomatch is not a function', () => {
    // @ts-expect-error
    expect(() => deferBranch().nomatch(123)).toThrow(TypeError);
  });
});
