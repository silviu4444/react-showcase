import { useQuery } from "@tanstack/react-query";
import { UserQueryKeys } from "../constants/user-query-keys.constants";
import { getUserProperties } from "../fetchers/user-properties.fetchers";
import { useUserState } from "@/core/hooks/auth.state";

const useUserProperties = () => {
  const user = useUserState();

  return useQuery({
    queryFn: getUserProperties,
    queryKey: UserQueryKeys.userProperties(user?.id),
    refetchOnWindowFocus: false,
    retry: false
  });
};

export default useUserProperties;
