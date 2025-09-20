type AnyFn = (...args: any[]) => any;
type Predicate<Fn extends AnyFn> = (...args: Parameters<Fn>) => boolean;
