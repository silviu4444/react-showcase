import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CgMathPlus } from "react-icons/cg";
import { LuSend } from "react-icons/lu";
import {
  CreateMessageDto,
  MESSAGE_TYPE
} from "../../../interfaces/messages.interfaces";

type MessageActionsProps = {
  isLoading: boolean;
  onMessageSent: (
    message: Omit<CreateMessageDto, "propertyId" | "recipientId">
  ) => void;
};

const MessageActions: React.FC<MessageActionsProps> = ({
  isLoading,
  onMessageSent
}) => {
  const [message, setMessage] = useState("");
  const [t] = useTranslation();

  const onSend = () => {
    if (message && message.trim().length !== 0) {
      onMessageSent({
        content: message,
        type: MESSAGE_TYPE.TEXT
      });
      setMessage("");
    }
  };

  return (
    <div
      className={cn("flex items-center gap-2", isLoading && "animate-pulse")}
    >
      <CgMathPlus className="size-6 min-w-6" />

      <Input
        className="flex-grow"
        type="text"
        placeholder={`${t("enter-your-message")}...`}
        value={message}
        onKeyDown={(e) => {
          e.code === "Enter" && onSend();
        }}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
      />
      <Button
        className="min-w-9"
        size="icon"
        onClick={onSend}
        disabled={isLoading}
      >
        <LuSend className="size-4" />
      </Button>
    </div>
  );
};

export default MessageActions;
