import { useSocketStatus } from "@/shared/hooks/socket/use-socket-status";
import { getSocket } from "@/shared/services/socket.service";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useMessagesStore from "../../../hooks/use-messages-store";
import MessageContainer from "../message-container/message-container";

const ChatItem = () => {
  const { propertyId, userId } = useParams();
  const isConnected = useSocketStatus();
  const { setMessageMeta } = useMessagesStore();

  useEffect(() => {
    return () => {
      setMessageMeta(null);
    };
  }, []);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (isConnected) {
      socket.emit("messages/connect-to-property-chat-message", {
        propertyId,
        userId
      });
    }
  }, [isConnected]);

  return <MessageContainer propertyId={propertyId!} recipientId={userId!} />;
};

export default ChatItem;
