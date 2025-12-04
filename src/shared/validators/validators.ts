import * as z from "zod";

export function applyMultipleValidators<T>(
  data: T,
  ctx: z.RefinementCtx,
  ...validators: ((data: T, ctx: z.RefinementCtx) => void)[]
): void {
  validators.forEach((validator) => validator(data, ctx));
}
