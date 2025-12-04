import useDateFormat from "@/shared/hooks/use-date-format";
import useScrollIntoViewByRef from "@/shared/hooks/use-scroll-into-view-by-ref";
import { cn } from "@/shared/lib/utils";
import { useEffect } from "react";
import useMarkConversationAsRead from "../../../hooks/use-mark-conversation-as-read";
import { MessageDef } from "../../../interfaces/messages.interfaces";
import { useUserState } from "@/core/hooks/auth.state";

type MessageChatBoxProps = {
  message: MessageDef;
  float: "left" | "right";
  isLast: boolean;
};

const MessageChatBox: React.FC<MessageChatBoxProps> = ({
  message,
  float,
  isLast
}) => {
  const { mutate } = useMarkConversationAsRead();
  const { ref } = useScrollIntoViewByRef({ enabled: isLast });
  const user = useUserState();
  const floatsLeft = float === "left";
  const floatsRight = float === "right";
  const format = useDateFormat();

  useEffect(() => {
    if (isLast && message.senderId !== user?.id) {
      mutate({
        propertyId: message.propertyId
      });
    }
  }, [isLast, user]);

  return (
    <div className="flex w-full flex-col gap-2" ref={ref}>
      <div
        className={cn(
          "flex w-full max-w-[320px] flex-col p-4",
          floatsLeft
            ? "rounded-e-md rounded-es-md border bg-secondary"
            : "self-end rounded-s-md rounded-se-md bg-primary"
        )}
      >
        <span
          className={cn(
            "text-sm font-normal",
            floatsLeft ? "text-secondary-foreground" : "text-white"
          )}
        >
          {message.content}
        </span>
      </div>
      <span
        className={cn(
          "text-xs font-light text-gray-500",
          floatsRight && "self-end"
        )}
      >
        {format({
          date: message.createdAt,
          format: "dd MMMM yyyy HH:mm"
        })}
      </span>
    </div>
  );
};

export default MessageChatBox;
