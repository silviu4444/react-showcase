import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import axiosInstance from "@/shared/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PREVIEWS_AND_UNREAD_MESSAGES } from "../query/query.keys";

type MarkConversationAsRead = {
  propertyId: string;
};

const useMarkConversationAsRead = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId }: MarkConversationAsRead) =>
      axiosInstance.get(
        ENDPOINTS.MESSAGE.MARK_CONVERSATION_AS_READ({ propertyId })
      ),
    onSuccess: () => {
      client.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey[0] === PREVIEWS_AND_UNREAD_MESSAGES
      });
    }
  });
};

export default useMarkConversationAsRead;
