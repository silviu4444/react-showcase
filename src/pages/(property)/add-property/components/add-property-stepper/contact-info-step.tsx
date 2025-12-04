import PhoneNumberSelect from "@/shared/components/form/phone-number-select/phone-number-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/shared/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  CONTACT_TYPE,
  CONTACT_TYPES
} from "@/shared/constants/property.constants";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddPropertyStepperType } from "../../schemas/add-property-stepper.schema";

const ContactInfoStep = () => {
  const form = useFormContext<AddPropertyStepperType>();
  const [t] = useTranslation();
  const contactType = useWatch({
    control: form.control,
    name: "contactInfoStep.contactType"
  });
  const contactTypeIsNotJustChat = contactType !== CONTACT_TYPE.JUST_CHAT;

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="contactInfoStep.contactType"
            render={({ field }) => (
              <FormItem className="basis-1/2">
                <FormLabel>{t("how-would-you-like-to-be-contacted")}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {CONTACT_TYPES.map(({ value, labelKey }) => (
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

          {contactTypeIsNotJustChat && (
            <FormField
              control={form.control}
              name="contactInfoStep.phone"
              render={({ field }) => (
                <FormItem className="basis-1/2">
                  <FormLabel markAsRequired>{t("phone-number")}</FormLabel>
                  <PhoneNumberSelect
                    phoneNumberList={[]}
                    withAddButton
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  />
                  <FormMessage messageFactory={(message) => t(message)} />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </Form>
  );
};

export default ContactInfoStep;
