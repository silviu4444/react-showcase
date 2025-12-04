import Container from "@/shared/components/ui/container";
import { useTranslation } from "react-i18next";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { Outlet, useParams } from "react-router-dom";
import ConversationPreviewsContainer from "./components/conversations-previews-container/conversations-previews-container";

const MessagesPage = () => {
  const [t] = useTranslation();
  const { propertyId } = useParams();

  return (
    <Container className="flex h-full">
      <ConversationPreviewsContainer />
      <div className="ml-4 hidden h-full border-l border-border sm:block"></div>
      <Outlet />
      {!propertyId && (
        <div className="hidden size-full sm:block">
          <div className="flex size-full flex-col items-center justify-center">
            <TbMessageCircleQuestion className="size-11" />
            <h1>{t("please-select-a-conversation")}</h1>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MessagesPage;
