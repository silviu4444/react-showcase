import { useUserState } from "@/core/hooks/auth.state";
import Spinner from "@/shared/components/ui/spinner";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import useConversationsInfiniteQuery from "../../../hooks/use-conversations-infinite-query";
import MessageChatBox from "../message-chat-box/message-chat-box";

type MessagesGridProps = {
  propertyId: string;
  recipientId: string;
};

const MessagesGrid: FC<MessagesGridProps> = ({ propertyId, recipientId }) => {
  const [t] = useTranslation();
  const user = useUserState();
  const { data, isFetchingNextPage, isLoading, hasNextPage, fetchNextPage } =
    useConversationsInfiniteQuery({
      propertyId,
      recipientId
    });
  const messages = data?.messages || [];
  const isLastPage = data && data.currentPage === data.lastPage;

  //   const onAcceptScheduleViewing = () => {
  //     toast({
  //       type: "success",
  //       message: "property-viewing-request-accepted-message",
  //       action: {
  //         label: "see-your-calendar",
  //         onClick: () => navigate(RouterPages.UserCalendar)
  //       }
  //     });
  //   };

  //   const onDenyScheduleViewing = (): void => {
  //     toast({
  //       type: "info",
  //       message: "you-have-declined-the-viewing-request"
  //     });
  //   };

  return (
    <div
      id="scrollableDiv"
      className="relative my-2 flex h-[calc(100%-156px)] flex-col gap-6 overflow-y-auto pr-0.5 sm:h-[calc(100%-116px)]"
    >
      {isFetchingNextPage && <Spinner className="mx-auto my-2" />}

      <InfiniteScroll
        dataLength={messages.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        inverse={true}
        scrollableTarget="scrollableDiv"
        loader={<></>}
      >
        {data?.lastPage === 0 && (
          <p className="my-auto text-center text-sm text-muted-foreground">
            {t("no-messages-have-been-send-yet")}
          </p>
        )}

        {isLastPage && (
          <p className="mb-4 text-center text-sm text-muted-foreground">
            {t("no-more-messages-to-load")}
          </p>
        )}

        {isLoading && <Spinner center />}

        <div className="flex size-full flex-col gap-2">
          {messages.map((message, index) => (
            <MessageChatBox
              key={message.messageId}
              message={message}
              isLast={index === messages.length - 1}
              float={user?.id === message.senderId ? "right" : "left"}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MessagesGrid;
