import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { PASSWORD_MIN_LENGTH } from "../constants/auth.constants";
import { useAuthRegisterMutation } from "../hooks/use-auth.query";
import { AuthMode } from "../interfaces/auth.interfaces";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "the-minimum-length-required"
  }),
  lastName: z.string().min(1, {
    message: "the-minimum-length-required"
  }),
  email: z.string().email({ message: "please-enter-a-valid-email" }),
  password: z.string().min(PASSWORD_MIN_LENGTH, {
    message: "the-minimum-length-required"
  })
});

export interface RegisterFields extends z.infer<typeof formSchema> {}

interface RegisterProps {
  setAuthMode: (mode: AuthMode) => void;
  onClose: () => void;
}

const Register: React.FC<RegisterProps> = ({ setAuthMode, onClose }) => {
  const { mutate, isPending, isSuccess } = useAuthRegisterMutation();
  const [t] = useTranslation();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("first-name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("first-name")} {...field} />
              </FormControl>
              <FormMessage
                messageFactory={(message) => t(message, { minLength: 1 })}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("last-name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("last-name")} {...field} />
              </FormControl>
              <FormMessage
                messageFactory={(message) => t(message, { minLength: 1 })}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("e-mail")}</FormLabel>
              <FormControl>
                <Input placeholder={t("e-mail")} {...field} />
              </FormControl>
              <FormMessage messageFactory={(message) => t(message)} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input placeholder={t("password")} {...field} type="password" />
              </FormControl>
              <FormMessage
                messageFactory={(message) =>
                  t(message, { minLength: PASSWORD_MIN_LENGTH })
                }
              />
            </FormItem>
          )}
        />
        <div className="text-center text-sm">
          {t("already-have-an-account")}
          <span
            className="ml-1 underline underline-offset-4"
            onClick={() => setAuthMode("login")}
          >
            {t("sign-in")}
          </span>
        </div>
        <Button type="submit" className="w-full" isLoading={isPending}>
          {t("register")}
        </Button>
      </form>
    </Form>
  );
};

export default Register;
