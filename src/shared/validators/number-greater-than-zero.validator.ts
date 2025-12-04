import * as z from "zod";
import { cannotStartWithZeroValidator } from "./cannot-start-with-zero.validator";

export const numberGreaterThanZeroValidator = (
  value: string | undefined,
  ctx: z.RefinementCtx
): void => {
  cannotStartWithZeroValidator()(value, ctx);

  const invalidCharacters = ["e", "E", "+", "-"];
  if (invalidCharacters.some((char) => (value || "").includes(char))) {
    ctx.addIssue({
      message: "please-enter-a-number-greater-than-zero",
      code: z.ZodIssueCode.custom
    });
  }
};
