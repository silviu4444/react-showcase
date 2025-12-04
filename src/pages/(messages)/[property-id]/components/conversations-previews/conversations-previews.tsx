import { useUserState } from "@/core/hooks/auth.state";
import { cn } from "@/shared/lib/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useMessagesStore from "../../hooks/use-messages-store";
import {
  ConversationPreviewDef
} from "../../interfaces/messages.interfaces";
import ConversationPreviewItem from "../conversation-preview-item/conversation-preview-item";

type ConversationsPreviewsProps = {
  previews: ConversationPreviewDef[];
} & React.HTMLAttributes<HTMLDivElement>;

const ConversationsPreviews: FC<ConversationsPreviewsProps> = ({
  previews,
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const user = useUserState();
  const [t] = useTranslation();
  const { propertyId, userId } = useParams();

  const getUserToMessageId = (senderId: string, recipientId: string): string =>
    user?.id === recipientId ? senderId : recipientId;

  const isActive = (value: ConversationPreviewDef): boolean =>
    value.propertyId === propertyId &&
    getUserToMessageId(value.senderId, value.recipientId) === userId;

  const { setMessageMeta } = useMessagesStore();

  function onOpenConversation(preview: ConversationPreviewDef) {
    setMessageMeta({
      imageId: preview.imageId
    });
    const url = `/messages/${preview.propertyId}/${getUserToMessageId(preview.senderId, preview.recipientId)}`;
    navigate(url);
  }

  return (
    <div
      className={cn("flex h-full w-full flex-col gap-2", className)}
      {...props}
    >
      <h1 className="text-lg font-medium">{t("messages")}</h1>
      {!previews.length && (
        <p className="my-auto text-center text-sm text-muted-foreground">
          {t("no-messages-have-been-send-received-yet")}
        </p>
      )}

      {previews.map((preview) => (
        <ConversationPreviewItem
          preview={preview}
          selected={isActive(preview)}
          onClick={() => onOpenConversation(preview)}
        />
      ))}
    </div>
  );
};

export default ConversationsPreviews;
