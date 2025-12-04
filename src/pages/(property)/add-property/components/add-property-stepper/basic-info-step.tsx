import AddressAutocomplete from "@/shared/components/form/address-autocomplete/address-autocomplete";
import PropertyTypeSelect from "@/shared/components/form/property-type-select/property-type-select";
import RelationTypeSelect from "@/shared/components/form/relation-type-select/relation-type-select";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import {
  APARTMENT_FLOOR_TYPES,
  HOUSE_FLOOR_TYPES,
  PROPERTY_TYPE
} from "@/shared/constants/property.constants";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddPropertyStepperType } from "../../schemas/add-property-stepper.schema";

const BasicInfoStep = () => {
  const form = useFormContext<AddPropertyStepperType>();
  const [t] = useTranslation();

  const propertyType = useWatch({
    control: form.control,
    name: "basicInfoStep.type"
  });
  const isApartment = propertyType === PROPERTY_TYPE.APARTMENT;

  useEffect(() => {
    if (propertyType && !isApartment) {
      const maxValue = HOUSE_FLOOR_TYPES[HOUSE_FLOOR_TYPES.length - 1].value;
      const fieldValue = form.getValues("basicInfoStep.floor") as string;
      fieldValue > maxValue && form.resetField("basicInfoStep.floor");
    }
  }, [propertyType]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="basicInfoStep.type"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>{t("property-type")}</FormLabel>
                <PropertyTypeSelect
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="basicInfoStep.relationType"
            render={({ field }) => (
              <FormItem className="mt-auto basis-1/2">
                <RelationTypeSelect
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="basicInfoStep.address"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel markAsRequired>{t("address")}</FormLabel>
                <AddressAutocomplete
                  defaultValue={field.value}
                  onChange={field.onChange}
                />
                <FormMessage messageFactory={(message) => t(message)} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="basicInfoStep.residentialComplex"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>{t("residential-complex")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("residential-complex")} />
                </FormControl>
                <FormMessage messageFactory={(message) => t(message)} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-col gap-2 md:w-1/2">
          <FormField
            control={form.control}
            name="basicInfoStep.floor"
            render={({ field }) => (
              <FormItem>
                <FormLabel markAsRequired>
                  {t(isApartment ? "floor" : "house-floors")}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("floor")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(isApartment
                      ? APARTMENT_FLOOR_TYPES
                      : HOUSE_FLOOR_TYPES
                    ).map(({ value, labelKey }) => (
                      <SelectItem key={value} value={value}>
                        {t(labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage messageFactory={(message) => t(message)} />
              </FormItem>
            )}
          />
          {isApartment && (
            <FormField
              control={form.control}
              name="basicInfoStep.lastFloor"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-end gap-1">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>{t("the-top-floor-of-the-building")}</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </Form>
  );
};

export default BasicInfoStep;
