import { useSocketStatus } from "@/shared/hooks/socket/use-socket-status";
import { cn } from "@/shared/lib/utils";
import { getSocket } from "@/shared/services/socket.service";
import { LucideBell } from "lucide-react";
import { FC, useEffect } from "react";
import { ButtonProps } from "react-day-picker";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import useNotificationsSocketListener from "./hooks/use-notifications-socket-listener";
import NotificationItem from "./components/notification-item/notification-item";

const NotificationsSystem: FC<ButtonProps> = ({ className, ...props }) => {
  const [t] = useTranslation();
  const isConnected = useSocketStatus();
  const notifications = useNotificationsSocketListener();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (isConnected) {
      socket.emit("notifications/connect-to-notifications");
    }
  }, [isConnected]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn("relative", className)}
          variant="outline"
          size="icon"
          {...props}
        >
          <LucideBell className="size-4" />
          {!!notifications.length && (
            <Badge
              variant="destructive"
              className="absolute -top-2 left-full flex size-5 min-w-5 -translate-x-1/2 items-center justify-center rounded-full px-1 py-[1px]"
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("notifications")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!notifications.length && (
          <p className="p-2 text-sm text-muted-foreground">
            {t("no-new-notifications")}
          </p>
        )}
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.notificationId}
            className="flex items-center gap-1"
          >
            <NotificationItem notification={notification} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsSystem;
