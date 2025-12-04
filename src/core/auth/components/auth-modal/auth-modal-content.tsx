import { useUserState } from "@/core/hooks/auth.state";
import { environment } from "@/environment";
import OAuthLoginButtons, {
  OAuthType
} from "@/shared/components/buttons/oauth-login-buttons";
import DrawerModalContentContainer from "@/shared/components/ui/drawer-modal/drawer-modal-content-container";
import SeparatorWithText from "@/shared/components/ui/separator-with-text";
import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { LOCAL_STORAGE_KEYS } from "@/shared/constants/local-storage.constants";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../../hooks/use-auth-modal";
import { AuthMode } from "../../interfaces/auth.interfaces";
import AuthByCredentials from "../auth-by-credentials";

const AuthModalContent = () => {
  const user = useUserState();
  const navigate = useNavigate();
  const [t] = useTranslation();
  const { isOpen, data, onClose } = useAuthModal();
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  useEffect(() => {
    if (user && isOpen) {
      onClose();
      data?.redirectUrlAfterAuth && navigate(data.redirectUrlAfterAuth);
    }
  }, [user, isOpen]);

  const onGoogleLogin = () => {
    data?.redirectUrlAfterAuth &&
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.REDIRECT_URL_AFTER_OAUTH,
        data.redirectUrlAfterAuth
      );
    window.location.href = `${environment.apiURL}/${ENDPOINTS.AUTH.USER_GOOGLE_LOGIN}`;
  };

  const onAuth = (type: OAuthType) => {
    if (type === "google") {
      onGoogleLogin();
    }
  };

  return (
    <DrawerModalContentContainer className="flex flex-col gap-2">
      <h1 className="text-center font-semibold leading-none tracking-tight">
        {t(authMode === "login" ? "welcome-back" : "register")}
      </h1>
      <div className="text-center text-xs dark:text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        {t("by-continuing-you-agree-to-our")}{" "}
        <a href="#">{t("terms-of-service")}</a> {t("and")}{" "}
        <a href="#">{t("privacy-policy")}</a>.
      </div>
      <h1 className="mt-4 text-center text-sm dark:text-muted-foreground">
        {t("login-with-your-google-account")}
      </h1>
      <div className="flex flex-col gap-6">
        <OAuthLoginButtons onAuth={onAuth} />
        <SeparatorWithText textKey="or-continue-with" lowercaseText />

        <AuthByCredentials
          authMode={authMode}
          setAuthMode={setAuthMode}
          onClose={() => onClose()}
        />
      </div>
    </DrawerModalContentContainer>
  );
};

export default AuthModalContent;
