import * as z from "zod";

export const AddressAutocompleteValueDefSchema = z.object({
  inputValue: z.string(),
  streetNumber: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  county: z.string().optional(),
  postalCode: z.string().optional(),
  lat: z.number(),
  lng: z.number()
});

export type AddressAutocompleteValueDef = z.infer<
  typeof AddressAutocompleteValueDefSchema
>;

export const addressAutocompleteValidator = (
  data: AddressAutocompleteValueDef,
  ctx: z.RefinementCtx
): void => {
  if (data?.city === "" && data?.lat) {
    ctx.addIssue({
      message: "this-address-is-invalid",
      code: z.ZodIssueCode.custom
    });
    return;
  }

  if (!data.city) {
    ctx.addIssue({
      message: "this-field-is-required",
      code: z.ZodIssueCode.custom
    });
  }
};

export const withStreetAddressAutocompleteValidator = (
  data: AddressAutocompleteValueDef,
  ctx: z.RefinementCtx
): void => {
  if (data.street === "") {
    ctx.addIssue({
      message: "the-address-must-contain-at-least-the-city-and-the-street",
      code: z.ZodIssueCode.custom
    });
  }
};
