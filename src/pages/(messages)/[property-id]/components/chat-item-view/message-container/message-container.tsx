import { Button } from "@/shared/components/ui/button";
import { RouterPages } from "@/shared/constants/router.constants";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import useMessageSocketListener from "../../../hooks/use-message-socket-listener";
import useSendMessage from "../../../hooks/use-send-message";
import { CreateMessageDto } from "../../../interfaces/messages.interfaces";
import { MessagesQueryKeys } from "../../../query/query.keys";
import MessageActions from "../message-actions/message-actions";
import MessageHeader from "../message-header/message-header";
import MessagesGrid from "../messages-grid/messages-grid";

type MessageContainerProps = {
  propertyId: string;
  recipientId: string;
};

const MessageContainer: FC<MessageContainerProps> = ({
  propertyId,
  recipientId
}) => {
  const client = useQueryClient();
  const navigate = useNavigate();
  const nextMessage = useMessageSocketListener();
  const { mutateAsync, isPending } = useSendMessage();

  const onInvalidateMessages = () => {
    client.invalidateQueries({
      queryKey: MessagesQueryKeys.CONVERSATIONS_BY_PROPERTY_ID(
        propertyId,
        recipientId
      )
    });
  };

  const onMessageSent = async (
    message: Omit<CreateMessageDto, "propertyId" | "recipientId">
  ) => {
    await mutateAsync({
      ...message,
      propertyId,
      recipientId
    });

    onInvalidateMessages();
  };

  useEffect(() => {
    if (nextMessage) {
      onInvalidateMessages();
    }
  }, [nextMessage, onInvalidateMessages]);

  return (
    <div className="flex size-full flex-col gap-1 pl-4">
      <div className="flex w-full items-center gap-2">
        <Button
          className="min-w-9"
          variant="outline"
          size="icon"
          onClick={() => navigate(RouterPages.Messages)}
        >
          <LuArrowLeft className="size-5" />
        </Button>

        <MessageHeader className="flex-grow" propertyId={propertyId} />
      </div>

      <MessagesGrid propertyId={propertyId} recipientId={recipientId} />

      <MessageActions isLoading={isPending} onMessageSent={onMessageSent} />
    </div>
  );
};

export default MessageContainer;
