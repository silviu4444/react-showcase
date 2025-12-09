import { WhenProps } from "./types";

export function When({ condition, children }: WhenProps) {
  return !!condition ? children : null;
}
