import IncrementalInput from "@/shared/components/form/incremental-input/incremental-input";
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
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  COMMODITIES_TYPES,
  MINIMUM_LEASE_TERM_TYPES,
  PROPERTY_CONDITIONS_TYPES,
  PROPERTY_FURNITURE_TYPES,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddPropertyStepperType } from "../../schemas/add-property-stepper.schema";

const DetailsStep = () => {
  const form = useFormContext<AddPropertyStepperType>();
  const [t] = useTranslation();

  const relationTypeIsRent =
    form.getValues("basicInfoStep.relationType") === RELATION_TYPE.RENT;

  const acceptsAMaximumNumberOfTenants = !!form.getValues(
    "detailsStep.maximumNumberOfTenants.accepts"
  );

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="detailsStep.price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel markAsRequired>{t("price")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("price")} type="number" />
                </FormControl>
                <FormMessage messageFactory={(message) => t(message)} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="detailsStep.surface"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel markAsRequired>{t("useful-m2")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("useful-m2")}
                    type="number"
                  />
                </FormControl>
                <FormMessage messageFactory={(message) => t(message)} />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="detailsStep.roomsNumber"
            render={({ field }) => (
              <FormItem className="flex basis-1/2 flex-col">
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
            name="detailsStep.bathroomsNumber"
            render={({ field }) => (
              <FormItem className="flex basis-1/2 flex-col">
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
        </div>

        <FormField
          control={form.control}
          name="detailsStep.propertyConditions"
          render={({ field }) => (
            <FormItem>
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

        {relationTypeIsRent && (
          <div className="flex flex-col gap-2">
            <FormField
              control={form.control}
              name="detailsStep.maximumNumberOfTenants.accepts"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <span>{t("do-you-accept-a-maximum-number-of-tenants")}</span>
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

            {acceptsAMaximumNumberOfTenants && (
              <FormField
                control={form.control}
                name="detailsStep.maximumNumberOfTenants.value"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{t("the-maximum-number-of-tenants")}</FormLabel>
                    <FormControl>
                      <IncrementalInput
                        initialValue={field.value}
                        onChange={field.onChange}
                        max={10}
                      />
                    </FormControl>
                    <FormMessage messageFactory={(message) => t(message)} />
                  </FormItem>
                )}
              />
            )}
          </div>
        )}

        <FormField
          control={form.control}
          name="detailsStep.hasElevator"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <span>{t("does-it-have-an-elevator")}</span>
              <div className="flex items-center gap-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t("yes-it-has-an-elevator")}</FormLabel>
              </div>
              <FormMessage messageFactory={(message) => t(message)} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detailsStep.propertyFurniture"
          render={({ field }) => (
            <FormItem>
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

        <div className="flex flex-col gap-2">
          <span>{t("other-conditions")}</span>
          {COMMODITIES_TYPES.map(({ formControlName, labelKey }) => (
            <FormField
              key={formControlName}
              control={form.control}
              name={`detailsStep.${formControlName}`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
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
          ))}
        </div>

        <FormField
          control={form.control}
          name="detailsStep.petFriendly"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <span>{t("do-you-accept-pets")}</span>
              <div className="flex items-center gap-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t("yes-i-accept-pets")}</FormLabel>
              </div>
              <FormMessage messageFactory={(message) => t(message)} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detailsStep.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("property-description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`${t("property-description")}...`}
                  rows={4}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage messageFactory={(message) => t(message)} />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="detailsStep.condominiumExpenses"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>{t("monthly-condominium-expenses")} €</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("monthly-condominium-expenses")}
                    type="number"
                  />
                </FormControl>
                <FormMessage messageFactory={(message) => t(message)} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="detailsStep.agencyFee"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>{t("agency-fee")} €</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("agency-fee")}
                    type="number"
                  />
                </FormControl>
                <FormMessage messageFactory={(message) => t(message)} />
              </FormItem>
            )}
          />
        </div>

        <div className="flex w-full flex-col gap-2 md:flex-row">
          {relationTypeIsRent && (
            <>
              <FormField
                control={form.control}
                name="detailsStep.rentInAdvance"
                render={({ field }) => (
                  <FormItem className="basis-1/2">
                    <FormLabel>
                      {t(
                        "for-how-many-months-do-you-ask-for-a-security-deposit"
                      )}
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder={t("security-deposit")}
                      type="number"
                    />
                    <FormMessage
                      messageFactory={(message) => t(message, { min: "-1" })}
                    />
                  </FormItem>
                )}
              />

              <div className="mt-2 flex basis-1/2 flex-col space-y-2">
                <FormLabel className="mb-0.5">
                  {t("minimum-lease-term")}
                </FormLabel>
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="detailsStep.minimumLeaseTerm.value"
                    render={({ field }) => (
                      <FormItem className="basis-1/2">
                        <Input
                          {...field}
                          placeholder={t("minimum-lease-term")}
                          type="number"
                        />
                        <FormMessage
                          messageFactory={(message) =>
                            t(message, { min: "-1" })
                          }
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="detailsStep.minimumLeaseTerm.type"
                    render={({ field }) => (
                      <FormItem className="basis-1/2">
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MINIMUM_LEASE_TERM_TYPES.map(
                              ({ value, labelKey }) => (
                                <SelectItem key={value} value={value}>
                                  {t(labelKey)}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage messageFactory={(message) => t(message)} />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Form>
  );
};

export default DetailsStep;
