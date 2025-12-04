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
import { useAuthLoginMutation } from "../hooks/use-auth.query";
import { AuthMode } from "../interfaces/auth.interfaces";

const formSchema = z.object({
  email: z.string().email({ message: "please-enter-a-valid-email" }),
  password: z.string().min(1, {
    message: "the-minimum-length-required"
  })
});

export interface LoginFields extends z.infer<typeof formSchema> {}

interface LoginProps {
  setAuthMode: (mode: AuthMode) => void;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ setAuthMode, onClose }) => {
  const { mutate, isPending, isSuccess } = useAuthLoginMutation();
  const [t] = useTranslation();

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
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
                <div className="flex items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    {t("forgot-your-password")}?
                  </a>
                </div>
                <FormControl>
                  <Input
                    placeholder={t("password")}
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage
                  messageFactory={(message) => t(message, { minLength: 1 })}
                />
              </FormItem>
            )}
          />
          <div className="text-center text-sm">
            {t("do-not-have-an-account")}
            <span
              className="ml-1 underline underline-offset-4"
              onClick={() => setAuthMode("register")}
            >
              {t("sign-up")}
            </span>
          </div>

          <Button type="submit" className="w-full" isLoading={isPending}>
            {t("login")}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
