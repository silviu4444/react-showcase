import {
  COMMODITIES_TYPE,
  CONTACT_TYPE,
  MINIMUM_LEASE_TERM_TYPE,
  PROPERTY_CONDITIONS_TYPE,
  PROPERTY_FURNITURE_TYPE,
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import {
  addressAutocompleteValidator,
  AddressAutocompleteValueDefSchema,
  withStreetAddressAutocompleteValidator
} from "@/shared/schemas/address-autocomplete.schema";
import { propertyPhotoSchema } from "@/shared/schemas/property-photo.schema";
import { cannotStartWithZeroValidator } from "@/shared/validators/cannot-start-with-zero.validator";
import { numberGreaterThanZeroValidator } from "@/shared/validators/number-greater-than-zero.validator";
import { numberGreaterThanValidator } from "@/shared/validators/number-greater-than.validator";
import { applyMultipleValidators } from "@/shared/validators/validators";
import { whiteSpaceValidator } from "@/shared/validators/white-space.validator";
import * as z from "zod";
import { ADD_PROPERTY_STEPS } from "../constants/add-property-stepper.constants";

export const addPropertyStepperSchema = z.object({
  [ADD_PROPERTY_STEPS.STEP_BASIC_INFO]: z.object({
    type: z.nativeEnum(PROPERTY_TYPE),
    relationType: z.nativeEnum(RELATION_TYPE),
    address: AddressAutocompleteValueDefSchema.superRefine((data, ctx) => {
      applyMultipleValidators(
        data,
        ctx,
        addressAutocompleteValidator,
        withStreetAddressAutocompleteValidator
      );
    }),
    floor: z.string().min(1, { message: "this-field-is-required" }),
    lastFloor: z.boolean().optional(),
    residentialComplex: z.string().optional().superRefine(whiteSpaceValidator)
  }),
  [ADD_PROPERTY_STEPS.STEP_DETAILS]: z.object({
    surface: z
      .string()
      .min(1, {
        message: "this-field-is-required"
      })
      .superRefine(numberGreaterThanZeroValidator),
    propertyConditions: z.nativeEnum(PROPERTY_CONDITIONS_TYPE),
    roomsNumber: z.coerce.number({ message: "this-field-is-required" }),
    bathroomsNumber: z.coerce.number({ message: "this-field-is-required" }),
    hasElevator: z.boolean().optional(),
    propertyFurniture: z.nativeEnum(PROPERTY_FURNITURE_TYPE),
    [COMMODITIES_TYPE.AIR_CONDITIONING]: z.boolean().optional(),
    [COMMODITIES_TYPE.BALCONY]: z.boolean().optional(),
    [COMMODITIES_TYPE.CELLAR]: z.boolean().optional(),
    [COMMODITIES_TYPE.GARAGE]: z.boolean().optional(),
    [COMMODITIES_TYPE.TERRACE]: z.boolean().optional(),
    [COMMODITIES_TYPE.WARDROBE_ON_THE_WALL]: z.boolean().optional(),
    maximumNumberOfTenants: z.object({
      accepts: z.boolean().optional(),
      value: z.coerce.number({
        message: "this-field-is-required"
      })
    }),
    petFriendly: z.boolean().optional(),
    price: z
      .string()
      .min(1, {
        message: "this-field-is-required"
      })
      .superRefine(numberGreaterThanZeroValidator),
    description: z.string().optional().superRefine(whiteSpaceValidator),
    condominiumExpenses: z
      .string()
      .optional()
      .superRefine(numberGreaterThanZeroValidator),
    rentInAdvance: z
      .string()
      .superRefine((data, ctx) =>
        applyMultipleValidators(
          data,
          ctx,
          numberGreaterThanValidator(0),
          cannotStartWithZeroValidator({ checkAfterMinLength: 2 })
        )
      ),
    minimumLeaseTerm: z.object({
      type: z.nativeEnum(MINIMUM_LEASE_TERM_TYPE),
      value: z
        .string()
        .superRefine((data, ctx) =>
          applyMultipleValidators(
            data,
            ctx,
            numberGreaterThanValidator(0),
            cannotStartWithZeroValidator({ checkAfterMinLength: 2 })
          )
        )
    }),
    agencyFee: z.string().optional().superRefine(numberGreaterThanZeroValidator)
  }),
  [ADD_PROPERTY_STEPS.STEP_CONTACT_INFO]: z
    .object({
      contactType: z.nativeEnum(CONTACT_TYPE),
      phone: z.string().optional()
    })
    .refine(
      (data) => {
        if (data.contactType !== CONTACT_TYPE.JUST_CHAT) {
          return false;
        }

        return true;
      },
      {
        message: "this-field-is-required",
        path: ["phone"]
      }
    ),
  [ADD_PROPERTY_STEPS.STEP_PHOTOS]: z.object({
    photos: z.array(propertyPhotoSchema)
  })
});

export type AddPropertyStepperType = z.infer<typeof addPropertyStepperSchema>;

export const AddPropertyStepperDefaultValues: AddPropertyStepperType = {
  basicInfoStep: {
    type: PROPERTY_TYPE.APARTMENT,
    relationType: RELATION_TYPE.RENT,
    address: {
      inputValue: "",
      lat: 0,
      lng: 0
    },
    floor: "",
    lastFloor: false,
    residentialComplex: ""
  },
  detailsStep: {
    surface: "",
    propertyConditions: PROPERTY_CONDITIONS_TYPE.GOOD,
    roomsNumber: 1,
    bathroomsNumber: 1,
    hasElevator: false,
    propertyFurniture:
      PROPERTY_FURNITURE_TYPE.EQUIPPED_KITCHEN_AND_FURNISHED_HOUSE,
    [COMMODITIES_TYPE.AIR_CONDITIONING]: false,
    [COMMODITIES_TYPE.BALCONY]: false,
    [COMMODITIES_TYPE.CELLAR]: false,
    [COMMODITIES_TYPE.GARAGE]: false,
    [COMMODITIES_TYPE.TERRACE]: false,
    [COMMODITIES_TYPE.WARDROBE_ON_THE_WALL]: false,
    maximumNumberOfTenants: {
      accepts: false,
      value: 1
    },
    petFriendly: false,
    price: "",
    description: "",
    condominiumExpenses: "",
    rentInAdvance: "0",
    minimumLeaseTerm: {
      type: MINIMUM_LEASE_TERM_TYPE.MONTHS,
      value: "0"
    },
    agencyFee: ""
  },
  contactInfoStep: {
    contactType: CONTACT_TYPE.JUST_CHAT,
    phone: ""
  },
  photosStep: {
    photos: []
  }
};
