export type Procedure = (...args: any[]) => void;

export interface DebouncedFunction<F extends Procedure> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): void;
  cancel: () => void;
}

export function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 1000
): DebouncedFunction<F> {
  let timeout: number;

  const debouncedFunction = function (
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ) {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
      func(...args);
    }, waitMilliseconds);
  };

  debouncedFunction.cancel = function () {
    if (timeout) clearTimeout(timeout);
  };

  return debouncedFunction;
}
