import { useEffect, useState } from "react";

type Props<T> = {
  value: T;
  delay?: number;
};

export function useDebounceValue<T>({ value, delay = 300 }: Props<T>) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}
