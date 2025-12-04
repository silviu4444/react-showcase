import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { useSocketStatus } from "@/shared/hooks/socket/use-socket-status";
import { DtoWithPagination } from "@/shared/interfaces/dto.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { mapDtoWithPagination } from "@/shared/utils/dto.utils";
import {
  InfiniteQueryObserverResult,
  useInfiniteQuery
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { MessageDef } from "../interfaces/messages.interfaces";
import { MessagesQueryKeys } from "../query/query.keys";

type ConversationsInfiniteQueryProps = {
  propertyId: string;
  recipientId: string;
};

const useConversationsInfiniteQuery = ({
  propertyId,
  recipientId
}: ConversationsInfiniteQueryProps): InfiniteQueryObserverResult<
  {
    currentPage: number;
    lastPage: number;
    messages: MessageDef[];
  },
  Error
> => {
  const isConnected = useSocketStatus();
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      axiosInstance
        .get<
          any,
          AxiosResponse<DtoWithPagination<MessageDef[]>>
        >(ENDPOINTS.MESSAGE.GET_CONVERSATIONS_BY_PROPERTY_ID(propertyId, recipientId, pageParam))
        .then(mapDtoWithPagination()),
    queryKey: MessagesQueryKeys.CONVERSATIONS_BY_PROPERTY_ID(
      propertyId,
      recipientId
    ),
    // TODO can be improved for multi pages!
    refetchInterval: () => (isConnected ? false : 3 * 10 * 1000),
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    select: (data) => ({
      currentPage: data.pageParams[data.pageParams.length - 1],
      lastPage: data.pages[0].pagination.lastPage,
      messages: data.pages
        .map((page) => page.data)
        .flat()
        .reverse()
    }),
    getNextPageParam: ({ pagination }) =>
      pagination.page < pagination.lastPage ? pagination.page + 1 : undefined
  });
};

export default useConversationsInfiniteQuery;
