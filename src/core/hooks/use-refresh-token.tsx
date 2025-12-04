import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { ErrorDto } from "@/shared/interfaces/dto.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { REFRESH_TOKEN_REFRESH_INTERVAL } from "../auth/constants/auth.constants";
import { AuthQueryKeys } from "../auth/constants/query-keys.constants";
import { useIsAuthenticated } from "./use-is-authenticated";

const useRefreshToken = () => {
  const isAuthenticated = useIsAuthenticated();

  const result = useQuery<any, AxiosError<ErrorDto>>({
    queryFn: () => axiosInstance.post(ENDPOINTS.AUTH.REFRESH_TOKEN),
    queryKey: AuthQueryKeys.refreshToken(),
    refetchInterval: REFRESH_TOKEN_REFRESH_INTERVAL,
    staleTime: REFRESH_TOKEN_REFRESH_INTERVAL,
    enabled: isAuthenticated
  });

  return { isAuthenticated, ...result };
};

export default useRefreshToken;
