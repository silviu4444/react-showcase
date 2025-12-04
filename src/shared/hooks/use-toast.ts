import { useTranslation } from "react-i18next";
import { ExternalToast, toast as SonnerToast } from "sonner";

export type SoonerMessageType = "success" | "warning" | "info" | "error";

export type SoonerMessage = string | [string, object];

type OpenToastPayload = Omit<ExternalToast, "title" | "description"> & {
  title?: SoonerMessage;
  message: SoonerMessage;
  type?: SoonerMessageType;
};

const useToast = () => {
  const [t] = useTranslation();

  function translateMessage(message: SoonerMessage): string {
    return Array.isArray(message)
      ? t(message[0], { ...message[1] })
      : t(message);
  }

  const toast = ({
    title,
    message,
    type = "info",
    ...config
  }: OpenToastPayload) => {
    SonnerToast[type](title ? translateMessage(title) : "", {
      ...config,
      description: translateMessage(message),
      closeButton: true
    });
  };

  return { toast };
};

export default useToast;
