import { useEffect, useState } from "react";

export const deviceMatcherMap = {
  bp640: "(max-width: 639px)",
  min640Max1023: "(min-width: 640px) and (max-width: 1023px)",
  min1024: "(min-width: 1024px)",
  min640: "(min-width: 640px)"
};

export function useMediaQuery(matcher: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(matcher);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [matcher]);

  return value;
}
