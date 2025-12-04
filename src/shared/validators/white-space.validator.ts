import * as z from "zod";

export const whiteSpaceValidator = (
  value: string | undefined,
  ctx: z.RefinementCtx
): void => {
  if (value && !value.trim().length) {
    ctx.addIssue({
      message: "empty-spaces-are-not-allowed",
      code: z.ZodIssueCode.custom
    });
  }
};
