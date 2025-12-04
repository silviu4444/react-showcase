import { environment } from "@/environment";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

type ConnectSocketProps = {
  onConnect: (socket: Socket) => void;
  onDisconnect: () => void;
};
export const connectSocket = (props?: ConnectSocketProps) => {
  if (!socket) {
    socket = environment.production
      ? io({
          withCredentials: true
        })
      : io("http://localhost:8085", {
          withCredentials: true
        });

    socket.on("connect", () => {
      props?.onConnect(socket!);
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      props?.onDisconnect();
      console.log("Socket disconnected:", reason);
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => socket;
