import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import { MessagesQueryKeys } from "@/pages/(messages)/[property-id]/query/query.keys";
import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { DEFAULT_CACHE_TIME } from "@/shared/constants/query-keys.constants";
import { Dto } from "@/shared/interfaces/dto.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { mapDto } from "@/shared/utils/dto.utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const useUnreadMessagesCountQuery = () => {
  const isAuthenticated = useIsAuthenticated();
  const { data, ...rest } = useQuery({
    queryKey: MessagesQueryKeys.UNREAD_MESSAGES_COUNT,
    queryFn: () =>
      axiosInstance
        .get<any, AxiosResponse<Dto<{ count: number }>>>(
          ENDPOINTS.MESSAGE.GET_UNREAD_MESSAGES_COUNT
        )
        .then(mapDto())
        .then(({ count }) => count),
    staleTime: DEFAULT_CACHE_TIME,
    enabled: isAuthenticated
  });

  return { data: data || 0, ...rest };
};

export default useUnreadMessagesCountQuery;
