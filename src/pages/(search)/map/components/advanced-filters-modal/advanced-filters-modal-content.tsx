import AddressAutocomplete from "@/shared/components/form/address-autocomplete/address-autocomplete";
import IncrementalInput from "@/shared/components/form/incremental-input/incremental-input";
import RelationTypeSelect from "@/shared/components/form/relation-type-select/relation-type-select";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { DrawerFooter } from "@/shared/components/ui/drawer";
import DrawerModalContentContainer from "@/shared/components/ui/drawer-modal/drawer-modal-content-container";
import DrawerModalFooterContainer from "@/shared/components/ui/drawer-modal/drawer-modal-footer-container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import {
  COMMODITIES_TYPE,
  COMMODITIES_TYPES,
  PROPERTY_CONDITIONS_TYPE,
  PROPERTY_CONDITIONS_TYPES,
  PROPERTY_FURNITURE_TYPE,
  PROPERTY_FURNITURE_TYPES,
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import useScrollIntoView from "@/shared/hooks/use-scroll-into-view";
import {
  QueryFiltersParams,
  QueryFiltersParamsKeys
} from "@/shared/interfaces/property/property.interfaces";
import { AddressAutocompleteValueDefSchema } from "@/shared/schemas/address-autocomplete.schema";
import { numberGreaterThanZeroValidator } from "@/shared/validators/number-greater-than-zero.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as z from "zod";
import { useQueryFilters } from "../../../../../shared/providers/query-filters-provider";
import { MAIN_SEARCH_PROPERTY_TYPES } from "../../constants/main-search.constants";
import { useAdvancedFiltersModal } from "../../hooks/use-advanced-filters-modal";
import usePatchAddFormFromQueries from "../../hooks/use-patch-add-form-from-queries";

const formSchema = z.object({
  type: z.nativeEnum(PROPERTY_TYPE),
  relationType: z.nativeEnum(RELATION_TYPE),
  city: AddressAutocompleteValueDefSchema,
  priceFrom: z.string().superRefine(numberGreaterThanZeroValidator),
  priceUpTo: z.string().superRefine(numberGreaterThanZeroValidator),
  surface: z.string().superRefine(numberGreaterThanZeroValidator),
  withoutRentInAdvance: z.boolean().optional(),
  propertyConditions: z.nativeEnum(PROPERTY_CONDITIONS_TYPE).optional(),
  propertyFurniture: z.nativeEnum(PROPERTY_FURNITURE_TYPE).optional(),
  roomsNumber: z.coerce.number(),
  bathroomsNumber: z.coerce.number(),
  hasElevator: z.boolean().optional(),
  petFriendly: z.boolean().optional(),
  [COMMODITIES_TYPE.AIR_CONDITIONING]: z.boolean().optional(),
  [COMMODITIES_TYPE.BALCONY]: z.boolean().optional(),
  [COMMODITIES_TYPE.CELLAR]: z.boolean().optional(),
  [COMMODITIES_TYPE.GARAGE]: z.boolean().optional(),
  [COMMODITIES_TYPE.TERRACE]: z.boolean().optional(),
  [COMMODITIES_TYPE.WARDROBE_ON_THE_WALL]: z.boolean().optional()
});

export type AdvancedFiltersType = z.infer<typeof formSchema>;

export const addFiltersDefaultValues: AdvancedFiltersType = {
  type: PROPERTY_TYPE.APARTMENT,
  relationType: RELATION_TYPE.RENT,
  city: {
    inputValue: "",
    lat: 0,
    lng: 0
  },
  priceFrom: "",
  priceUpTo: "",
  surface: "",
  withoutRentInAdvance: false,
  propertyConditions: undefined,
  propertyFurniture: undefined,
  bathroomsNumber: 0,
  roomsNumber: 0,
  petFriendly: false,
  hasElevator: false,
  [COMMODITIES_TYPE.AIR_CONDITIONING]: false,
  [COMMODITIES_TYPE.BALCONY]: false,
  [COMMODITIES_TYPE.CELLAR]: false,
  [COMMODITIES_TYPE.GARAGE]: false,
  [COMMODITIES_TYPE.TERRACE]: false,
  [COMMODITIES_TYPE.WARDROBE_ON_THE_WALL]: false
};

const AdvancedFiltersModalContent = () => {
  const { isOpen, onClose, data } = useAdvancedFiltersModal();
  const [t] = useTranslation();
  const form = useForm<AdvancedFiltersType>({
    resolver: zodResolver(formSchema),
    defaultValues: addFiltersDefaultValues
  });
  const formRef = useRef<HTMLFormElement>();
  const { queryFilters, latLng, setQueries } = useQueryFilters();
  const patchFormFromQueries = usePatchAddFormFromQueries();
  const scrollIntoView = useScrollIntoView();

  function getDataAutomation(key: QueryFiltersParamsKeys): string {
    return `AdvancedFiltersModal-${key}`;
  }

  useEffect(() => {
    if (isOpen) {
      data.focusFieldKey &&
        scrollIntoView(
          `[data-automation='${getDataAutomation(data.focusFieldKey)}']`
        );
      patchFormFromQueries(form);
    }
  }, [isOpen]);

  function onSubmit(data: AdvancedFiltersType) {
    const filters: QueryFiltersParams = {
      lat: data.city.lat.toString(),
      lng: data.city.lng.toString(),
      city: data.city.inputValue,
      rt: data.relationType as RELATION_TYPE,
      pt: data.type as PROPERTY_TYPE,
      pc: data.propertyConditions as PROPERTY_CONDITIONS_TYPE,
      pf: data.propertyFurniture as PROPERTY_FURNITURE_TYPE,
      airC: data[COMMODITIES_TYPE.AIR_CONDITIONING],
      wotw: data[COMMODITIES_TYPE.WARDROBE_ON_THE_WALL],
      balcony: data[COMMODITIES_TYPE.BALCONY],
      cellar: data[COMMODITIES_TYPE.CELLAR],
      terrace: data[COMMODITIES_TYPE.TERRACE],
      garage: data[COMMODITIES_TYPE.GARAGE],
      hasElevator: data.hasElevator,
      page: "0",
      petF: data.petFriendly,
      bn: data.bathroomsNumber,
      priceF: data.priceFrom,
      priceT: data.priceUpTo,
      rn: data.roomsNumber,
      surface: data.surface,
      wria: data.withoutRentInAdvance
    };
    setQueries({ filters, merge: false });
    onClose();
  }

  function removeFilters() {
    const filters: QueryFiltersParams = {
      ...addFiltersDefaultValues,
      lat: latLng.lat.toString(),
      lng: latLng.lng.toString(),
      city: queryFilters.city,
      rt: addFiltersDefaultValues.relationType as RELATION_TYPE,
      pt: addFiltersDefaultValues.type as PROPERTY_TYPE,
      pc: addFiltersDefaultValues.propertyConditions as PROPERTY_CONDITIONS_TYPE,
      pf: addFiltersDefaultValues.propertyFurniture as PROPERTY_FURNITURE_TYPE
    };
    setQueries({ filters, merge: false });
    onClose();
  }

  function triggerSubmit() {
    formRef.current?.requestSubmit();
  }

  const operationTypeIsRent =
    form.getValues("relationType") === RELATION_TYPE.RENT;

  return (
    <>
      <DrawerModalContentContainer hasFooter>
        <Form {...form}>
          <form
            className="flex flex-col gap-2 p-2"
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef as any}
          >
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger
                          data-automation={getDataAutomation("pt")}
                        >
                          <SelectValue placeholder={t("property-type")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MAIN_SEARCH_PROPERTY_TYPES.map(
                          ({ type, labelKey }) => (
                            <SelectItem key={type} value={type}>
                              {t(labelKey)}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="relationType"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <RelationTypeSelect
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      data-automation={getDataAutomation("rt")}
                    />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem data-automation={getDataAutomation("city")}>
                  <FormLabel>{t("city")}</FormLabel>
                  <AddressAutocomplete
                    type="(cities)"
                    placeholderKey="city"
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage messageFactory={(message) => t(message)} />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2 sm:flex-row">
              <FormField
                control={form.control}
                name="priceFrom"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>{t("price-from")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("price-from")}
                        type="number"
                        data-automation={getDataAutomation("priceF")}
                      />
                    </FormControl>
                    <FormMessage messageFactory={(message) => t(message)} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceUpTo"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2">
                    <FormLabel>{t("price-up-to")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("price-up-to")}
                        type="number"
                        data-automation={getDataAutomation("priceT")}
                      />
                    </FormControl>
                    <FormMessage messageFactory={(message) => t(message)} />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <FormField
                control={form.control}
                name="surface"
                render={({ field }) => (
                  <FormItem className={operationTypeIsRent ? "" : "w-full"}>
                    <FormLabel>{t("useful-m2")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("useful-m2")}
                        type="number"
                        data-automation={getDataAutomation("surface")}
                      />
                    </FormControl>
                    <FormMessage messageFactory={(message) => t(message)} />
                  </FormItem>
                )}
              />
              {operationTypeIsRent && (
                <FormField
                  control={form.control}
                  name="withoutRentInAdvance"
                  render={({ field }) => (
                    <FormItem data-automation={getDataAutomation("wria")}>
                      <FormLabel>{t("rent-in-advance")}</FormLabel>
                      <div className="flex items-center gap-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>// TO BE REPLACED</FormLabel>
                      </div>
                      <FormMessage messageFactory={(message) => t(message)} />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="propertyConditions"
              render={({ field }) => (
                <FormItem data-automation={getDataAutomation("pc")}>
                  <FormLabel>{t("status")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {PROPERTY_CONDITIONS_TYPES.map(({ value, labelKey }) => (
                        <FormItem
                          key={value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t(labelKey)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyFurniture"
              render={({ field }) => (
                <FormItem data-automation={getDataAutomation("pf")}>
                  <FormLabel>{t("conditions")}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {PROPERTY_FURNITURE_TYPES.map(({ value, labelKey }) => (
                        <FormItem
                          key={value}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t(labelKey)}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roomsNumber"
              render={({ field }) => (
                <FormItem
                  className="flex flex-col"
                  data-automation={getDataAutomation("rn")}
                >
                  <FormLabel>{t("the-number-of-rooms")}</FormLabel>
                  <FormControl>
                    <IncrementalInput
                      initialValue={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage messageFactory={(message) => t(message)} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bathroomsNumber"
              render={({ field }) => (
                <FormItem
                  className="flex flex-col"
                  data-automation={getDataAutomation("bn")}
                >
                  <FormLabel>{t("the-number-of-bathrooms")}</FormLabel>
                  <FormControl>
                    <IncrementalInput
                      initialValue={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage messageFactory={(message) => t(message)} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hasElevator"
              render={({ field }) => (
                <FormItem
                  className="flex flex-col"
                  data-automation={getDataAutomation("hasElevator")}
                >
                  <FormLabel>{t("with-elevator")}</FormLabel>
                  <div className="flex items-center gap-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{t("yes")}</FormLabel>
                  </div>
                  <FormMessage messageFactory={(message) => t(message)} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="petFriendly"
              render={({ field }) => (
                <FormItem
                  className="flex flex-col"
                  data-automation={getDataAutomation("petF")}
                >
                  <FormLabel>{t("pets")}</FormLabel>
                  <div className="flex items-center gap-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{t("pet-friendly")}</FormLabel>
                  </div>
                  <FormMessage messageFactory={(message) => t(message)} />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <FormLabel>{t("other-conditions")}</FormLabel>
              {COMMODITIES_TYPES.map(
                ({ formControlName, labelKey, paramKey }) => (
                  <FormField
                    key={formControlName}
                    control={form.control}
                    name={`${formControlName}`}
                    render={({ field }) => (
                      <FormItem
                        className="flex flex-col"
                        data-automation={getDataAutomation(paramKey)}
                      >
                        <div className="flex items-center gap-1">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>{t(labelKey)}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                )
              )}
            </div>
          </form>
        </Form>
      </DrawerModalContentContainer>
      <DrawerFooter>
        <DrawerModalFooterContainer>
          <Button className="order-2 w-full" onClick={triggerSubmit}>
            {t("apply")}
          </Button>
          <Button
            className="order-1 w-full"
            variant="outline"
            onClick={removeFilters}
          >
            {t("reset-filters")}
          </Button>
        </DrawerModalFooterContainer>
      </DrawerFooter>
    </>
  );
};

export default AdvancedFiltersModalContent;
