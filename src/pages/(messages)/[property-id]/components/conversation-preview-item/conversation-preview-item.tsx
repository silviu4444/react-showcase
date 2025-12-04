import { useUserState } from "@/core/hooks/auth.state";
import { cn } from "@/shared/lib/utils";
import { FC, useEffect } from "react";
import { ConversationPreviewDef } from "../../interfaces/messages.interfaces";
import ConversationImage from "../conversation-image/conversation-image";
import useMessagesStore from "../../hooks/use-messages-store";

type ConversationPreviewItemProps = {
  selected: boolean;
  preview: ConversationPreviewDef;
} & React.HTMLAttributes<HTMLDivElement>;

const ConversationPreviewItem: FC<ConversationPreviewItemProps> = ({
  className,
  preview,
  selected,
  ...props
}) => {
  const user = useUserState();
  const { messageMeta, setMessageMeta } = useMessagesStore();

  useEffect(() => {
    if (selected && !messageMeta) {
      setMessageMeta({ imageId: preview.imageId });
    }
  }, [selected, messageMeta]);
  return (
    <div
      className={cn(
        "flex cursor-default items-center gap-1 rounded-md border border-secondary bg-secondary p-2 transition-colors hover:bg-secondary/80",
        className,
        selected && "border-primary"
      )}
      {...props}
    >
      <ConversationImage imageId={preview.imageId} />

      <div
        className={cn(
          "dynamic-ellipsis",
          !preview.readAt && preview.recipientId === user?.id && "font-semibold"
        )}
      >
        <span>{preview.content}</span>
      </div>
    </div>
  );
};

export default ConversationPreviewItem;
