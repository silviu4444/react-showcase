import { environment } from "@/environment";
import { useSocketStatus } from "@/shared/hooks/socket/use-socket-status";
import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";

type SocketConnectionStatusProps = {
  className?: string;
};

const SocketConnectionStatus: FC<SocketConnectionStatusProps> = ({
  className
}) => {
  const [t] = useTranslation();
  const isConnected = useSocketStatus();

  if (environment.production) {
    return null;
  }
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span
        className={cn(
          "text-xs",
          isConnected ? "text-green-500" : "animate-pulse text-yellow-500"
        )}
      >
        {isConnected ? t("connected") : t("connecting") + "..."}
      </span>
      <div
        className={cn(
          "size-2 rounded-full",
          isConnected ? "bg-green-500" : "animate-pulse bg-yellow-500"
        )}
      ></div>
    </div>
  );
};

export default SocketConnectionStatus;
