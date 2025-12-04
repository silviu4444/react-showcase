import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useMessagesStore from "../../../hooks/use-messages-store";
import ConversationImage from "../../conversation-image/conversation-image";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils";

type MessageHeaderProps = {
  propertyId: string;
} & React.HTMLAttributes<HTMLDivElement>;

const MessageHeader: React.FC<MessageHeaderProps> = ({
  propertyId,
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const { messageMeta } = useMessagesStore();
  const [t] = useTranslation();

  const onViewProperty = () => {
    navigate(`/p/${propertyId}`);
  };

  return (
    <div
      className={cn(
        "group flex cursor-default items-center gap-2 rounded-md bg-secondary p-2 shadow transition hover:bg-secondary/80",
        className
      )}
      {...props}
      onClick={onViewProperty}
    >
      <ConversationImage imageId={messageMeta?.imageId} />
      <span className="ml-auto truncate text-muted-foreground transition group-hover:text-primary">
        {t("see-property")}
      </span>
      <FaChevronRight className="mr-2 transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </div>
  );
};

export default MessageHeader;
