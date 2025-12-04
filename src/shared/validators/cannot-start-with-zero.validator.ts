import * as z from "zod";

type CannotStartWithZeroValidatorProps = {
  checkAfterMinLength: number;
};

export const cannotStartWithZeroValidator =
  (
    { checkAfterMinLength }: CannotStartWithZeroValidatorProps = {
      checkAfterMinLength: 1
    }
  ): ((value: string | undefined, ctx: z.RefinementCtx) => void) =>
  (value: string | undefined, ctx: z.RefinementCtx) => {
    const safeValue = value || "";
    if (
      safeValue.length >= checkAfterMinLength &&
      safeValue.startsWith("0")
    ) {
      ctx.addIssue({
        message: "the-number-cannot-start-with-zero",
        code: z.ZodIssueCode.custom
      });
    }
  };
