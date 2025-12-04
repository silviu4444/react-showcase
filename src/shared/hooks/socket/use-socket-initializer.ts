import {
  connectSocket,
  disconnectSocket
} from "@/shared/services/socket.service";
import { useEffect } from "react";
import { useSocketStore } from "./use-socket-status";
import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";

const useSocketInitializer = () => {
  const isAuthenticated = useIsAuthenticated();
  const { setIsConnected } = useSocketStore();

  useEffect(() => {
    if (isAuthenticated) {
      connectSocket({
        onConnect: () => setIsConnected(true),
        onDisconnect: () => setIsConnected(false)
      });

      return;
    }

    setIsConnected(false);
    disconnectSocket();
  }, [isAuthenticated]);
};

export default useSocketInitializer;
