import TryAgainButton from "@/shared/components/buttons/try-again-button";
import {
  deviceMatcherMap,
  useMediaQuery
} from "@/shared/hooks/use-media-query";
import { cn } from "@/shared/lib/utils";
import useConversationsPreviewsQuery from "../../hooks/use-conversations-preview-query";
import ConversationsPreviewsSkeleton from "../conversations-previews-skeleton/conversations-previews-skeleton";
import ConversationsPreviews from "../conversations-previews/conversations-previews";

const ConversationPreviewsContainer = ({}) => {
  const { isPending, isError, data, refetch } =
    useConversationsPreviewsQuery(1);
  const isPhone = useMediaQuery(deviceMatcherMap.bp640);
  const hasSelectedConversation = () =>
    window.location.pathname !== "/messages";

  return (
    <div
      className={cn(
        "w-full sm:block sm:w-44 sm:min-w-44",
        isPhone && hasSelectedConversation() && "hidden"
      )}
    >
      {isPending && <ConversationsPreviewsSkeleton />}
      {isError && <TryAgainButton onRetry={refetch} />}
      {data && (
        <ConversationsPreviews
          className={hasSelectedConversation() ? "hidden sm:flex" : ""}
          previews={data}
        />
      )}
    </div>
  );
};

export default ConversationPreviewsContainer;
