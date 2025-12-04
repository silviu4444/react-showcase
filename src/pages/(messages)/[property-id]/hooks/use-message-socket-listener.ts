import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import { getSocket } from "@/shared/services/socket.service";
import { useEffect, useState } from "react";
import { MessageDef } from "../interfaces/messages.interfaces";

const useMessageSocketListener = () => {
  const isAuthenticated = useIsAuthenticated();
  const [message, setMessage] = useState<MessageDef | null>(null);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const key = "property-messages";

    if (isAuthenticated) {
      socket.on(key, (message: MessageDef) => {
        setMessage(message);
      });
    }

    return () => {
      socket.off(key);
    };
  }, [isAuthenticated]);

  return message;
};

export default useMessageSocketListener;
