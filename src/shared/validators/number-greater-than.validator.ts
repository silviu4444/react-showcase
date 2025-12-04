import * as z from "zod";

export const numberGreaterThanValidator =
  (
    min: number,
  ): ((value: string | undefined, ctx: z.RefinementCtx) => void) =>
  (value: string | undefined, ctx: z.RefinementCtx) => {
    const invalidCharacters = ["e", "E", "+"];
    min > -1 && invalidCharacters.push("-");
    const valueToNumber = +(value || "");

    if (
      isNaN(valueToNumber) ||
      invalidCharacters.some((char) => (value || "").includes(char))
    ) {
      ctx.addIssue({
        message: "please-enter-a-valid-number",
        code: z.ZodIssueCode.custom
      });
      return;
    }

    if (valueToNumber < min) {
      ctx.addIssue({
        message: "please-enter-a-number-greater-than",
        code: z.ZodIssueCode.custom
      });
    }
  };
