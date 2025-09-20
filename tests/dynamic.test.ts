import { expect, describe, it } from 'vitest';
import { deferedBranchDynamic } from '../src/index.js';

describe('deferedBranchDynamic', () => {
  it('should select and run the first matched branch after predicate()', () => {
    const branch = deferedBranchDynamic()
      .add(
        () => false,
        () => 'no'
      )
      .add(
        () => true,
        () => 'yes'
      );

    branch.predicate();
    expect(branch.run()).toBe('yes');
  });

  it('nomatch should be called during predicate when nothing matches', () => {
    const called: string[] = [];
    const branch = deferedBranchDynamic()
      .add(
        () => false,
        () => called.push('a')
      )
      .add(
        () => false,
        () => called.push('b')
      )
      .nomatch(() => called.push('nomatch'));

    branch.predicate('x', 'y');
    expect(called).toEqual(['nomatch']);
  });

  it('run should pass arguments to the matched branch and return its value', () => {
    // predicate selects a branch; run forwards args to the branch
    const branch = deferedBranchDynamic()
      .add(
        () => true,
        (a: number, b: number) => a + b
      )
      .add(
        () => false,
        () => 0
      );

    branch.predicate();
    expect(branch.run(1, 2)).toBe(3);
  });

  it('first matching predicate wins (order preserved)', () => {
    const branch = deferedBranchDynamic()
      .add(
        () => true,
        () => 'first'
      )
      .add(
        () => true,
        () => 'second'
      );

    branch.predicate();
    expect(branch.run()).toBe('first');
  });

  it('should throw TypeError when adding non-function condition or branch', () => {
    expect(() => deferedBranchDynamic().add(123 as any, () => {})).toThrow(TypeError);
    expect(() => deferedBranchDynamic().add(() => true, 123 as any)).toThrow(TypeError);
  });

  it('nomatch should accept a handler and validate type', () => {
    expect(() => deferedBranchDynamic().nomatch(() => {})).not.toThrow();
    expect(() => deferedBranchDynamic().nomatch(123 as any)).toThrow(TypeError);
  });
});
