import { useModal } from "@/shared/hooks/use-modal";
import { whiteSpaceValidator } from "@/shared/validators/white-space.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import * as z from "zod";
import { Button } from "../../ui/button";
import { DrawerFooter } from "../../ui/drawer";
import DrawerModalContentContainer from "../../ui/drawer-modal/drawer-modal-content-container";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "../../ui/input-otp";

const formSchema = z.object({
  phone: z.string().superRefine(whiteSpaceValidator),
  confirmationCode: z.string().min(6, { message: "this-field-is-required" })
});

const AddPhoneNumberModalContent = () => {
  const [t] = useTranslation();
  const { onClose } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      phone: "",
      confirmationCode: ""
    }
  });
  const [validateViewVisible, setValidateViewVisible] = useState(false);

  const onNextStep = () => {
    !form.getFieldState("phone").invalid && setValidateViewVisible(true);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setValidateViewVisible(false);
    onClose({ field: "phoneNumber", data: data.phone });
    form.reset();
  };
  return (
    <>
      <DrawerModalContentContainer hasFooter>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {validateViewVisible && (
              <div className="flex flex-col items-center gap-2">
                <FormField
                  control={form.control}
                  name="confirmationCode"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        {t(
                          "a-code-has-been-sent-to-validate-your-phone-number",
                          {
                            phoneNumber: form.getValues("phone")
                          }
                        )}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {!validateViewVisible && (
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone-number")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("phone-number")}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage messageFactory={(message) => t(message)} />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </DrawerModalContentContainer>
      <DrawerFooter>
        {validateViewVisible ? (
          <Button className="w-full">{t("validate")}</Button>
        ) : (
          <Button className="group w-full" onClick={onNextStep} type="button">
            {t("to-validation")}
            <FaArrowRight className="ml-2 transition group-hover:translate-x-1" />
          </Button>
        )}
      </DrawerFooter>
    </>
  );
};

export default AddPhoneNumberModalContent;
