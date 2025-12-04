import { AuthQueryKeys } from "@/core/auth/constants/query-keys.constants";
import { UserDto } from "@/core/auth/interfaces/user.interfaces";
import { useAuthState } from "@/core/hooks/auth.state";
import Spinner from "@/shared/components/ui/spinner";
import { LOCAL_STORAGE_KEYS } from "@/shared/constants/local-storage.constants";
import { RouterPages } from "@/shared/constants/router.constants";
import useToast from "@/shared/hooks/use-toast";
import { mapUserDtoToDef } from "@/shared/utils/mappers.utils";
import { useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { setUser } = useAuthState();
  const { toast } = useToast();
  const client = useQueryClient();

  useEffect(() => {
    const jwtUser = params.get("jwtUser");
    if (jwtUser) {
      try {
        const data = jwtDecode(jwtUser as string) as { user: UserDto };
        const user = mapUserDtoToDef(data.user);

        client.setQueryData(AuthQueryKeys.refreshToken(), {});
        setUser(user);
        toast({
          type: "success",
          message: "you-have-been-logged-in"
        });

        const redirectUrl = localStorage.getItem(
          LOCAL_STORAGE_KEYS.REDIRECT_URL_AFTER_OAUTH
        );

        redirectUrl &&
          localStorage.removeItem(LOCAL_STORAGE_KEYS.REDIRECT_URL_AFTER_OAUTH);

        navigate(redirectUrl || RouterPages.Home, { replace: true });
      } catch (error) {}
    } else {
      navigate(RouterPages.Home);
    }
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="font-medium">{t("please-wait")}...</h1>
      <Spinner />
    </div>
  );
};

export default OAuthSuccess;
