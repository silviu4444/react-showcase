import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      pt: ["pt-safe-top"],
      pb: ["pb-safe-bottom"],
      pl: ["pl-safe-left"],
      pr: ["pr-safe-right"],
      mt: ["mt-safe-top"],
      mb: ["mb-safe-bottom"],
      ml: ["ml-safe-left"],
      mr: ["mr-safe-right"],
      top: ["top-safe"],
      bottom: ["bottom-safe"],
      left: ["left-safe"],
      right: ["right-safe"],
      h: ["h-full-safe", "h-full-safe-bottom"]
    }
  }
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
