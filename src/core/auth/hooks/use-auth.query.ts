import { useAuthState } from "@/core/hooks/auth.state";
import useToast from "@/shared/hooks/use-toast";
import { ErrorDto } from "@/shared/interfaces/dto.interfaces";
import useUIState from "@/shared/state/use-ui-state";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RegisterFields } from "../components/register";
import { AuthQueryKeys } from "../constants/query-keys.constants";
import { postLogin, postLogout, postRegister } from "../fetchers/auth.fetchers";

const useAuthRegisterMutation = () => {
  const { toast } = useToast();
  const language = useUIState(({ state }) => state.language);

  return useMutation({
    mutationKey: AuthQueryKeys.user(),
    mutationFn: (payload: RegisterFields) => postRegister(payload, language),
    retry: false,
    onSuccess: () => {
      toast({
        message: "a-confirmation-link-has-been-sent-to-your-email-address"
      });
    },
    onError: (error: AxiosError<ErrorDto>) => {
      error.response?.data.details === "Email is not available" &&
        toast({
          message: "this-user-already-exists",
          type: "warning"
        });
    }
  });
};

const useAuthLoginMutation = () => {
  const { setUser } = useAuthState();
  const { toast } = useToast();
  const client = useQueryClient();

  return useMutation({
    mutationKey: AuthQueryKeys.user(),
    mutationFn: postLogin,
    retry: false,
    onSuccess: (user) => {
      client.setQueryData(AuthQueryKeys.refreshToken(), {});
      setUser(user);
      toast({
        message: "you-have-been-logged-in",
        type: "success"
      });
    },
    onError: (error: AxiosError<any>) => {
      switch (error.response?.data.details) {
        case "Email is not verified":
          toast({
            message: "you-have-to-verify-your-email-address-before-login",
            type: "warning"
          });
          break;
        case "User account is locked":
          toast({
            message: "your-account-has-been-blocked",
            type: "warning"
          });

          break;
        case "Bad credentials":
          toast({
            message: "wrong-e-mail-or-password",
            type: "warning"
          });
      }
    }
  });
};

const useAuthLogoutMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: AuthQueryKeys.user(),
    mutationFn: postLogout,
    retry: 0,
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response?.status === 401) {
        toast({
          message: "you-have-been-logged-out",
          type: "success"
        });
      } else {
        toast({
          message: "something-went-wrong",
          type: "warning"
        });
      }
    }
  });
};

export { useAuthLoginMutation, useAuthLogoutMutation, useAuthRegisterMutation };
