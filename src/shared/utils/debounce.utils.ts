export const debounceFn = <T>(
  callback: (...args: T[]) => any,
  wait: number
) => {
  let timeoutId: number | undefined;

  return (...args: T[]) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
