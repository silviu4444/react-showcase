import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import { PREVIEWS_AND_UNREAD_MESSAGES } from "@/pages/(messages)/[property-id]/query/query.keys";
import { useSocketStatus } from "@/shared/hooks/socket/use-socket-status";
import { getSocket } from "@/shared/services/socket.service";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  NotificationDto,
  NotificationTypeEnum
} from "../interfaces/notification-system.interfaces";

const useNotificationsSocketListener = () => {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const isAuthenticated = useIsAuthenticated();
  const isConnected = useSocketStatus();
  const client = useQueryClient();

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !isConnected) return;

    const key = "notifications";
    if (isAuthenticated) {
      socket.on(key, (notification: NotificationDto | NotificationTypeEnum) => {
        if (notification === NotificationTypeEnum.MESSAGE) {
          client.invalidateQueries({
            predicate: ({ queryKey }) =>
              queryKey[0] === PREVIEWS_AND_UNREAD_MESSAGES
          });
        }

        if (typeof notification === "object") {
          setNotifications((prevNotifications) =>
            [notification, ...prevNotifications].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
          );
        }
      });
    } else {
      setNotifications([]);
      socket.off(key);
    }
  }, [isAuthenticated, isConnected]);

  return notifications;
};

export default useNotificationsSocketListener;
