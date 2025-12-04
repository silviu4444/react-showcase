import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { Dto, ErrorDto } from "@/shared/interfaces/dto.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
  UserManagementUserDef,
  UserManagementUserDto
} from "../interfaces/user-management.interfaces";
import { USER_MANAGEMENT_QUERY_KEYS } from "../query/query.keys";

const useGetUserQuery = ({ query }: { query: string }) => {
  return useQuery<UserManagementUserDef, AxiosError<ErrorDto>>({
    queryFn: () =>
      axiosInstance
        .get<AxiosError<ErrorDto>, AxiosResponse<Dto<UserManagementUserDto>>>(
          ENDPOINTS.ADMIN.GET_USER(query)
        )
        .then(({ data }) => data.data)
        .then((response) => ({
          ...response,
          role: response.authority
        })),
    queryKey: USER_MANAGEMENT_QUERY_KEYS.GET_USER(query),
    enabled: !!query
  });
};

export default useGetUserQuery;
