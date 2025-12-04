import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { Dto } from "@/shared/interfaces/dto.interfaces";
import { PropertyTypeDto } from "@/shared/interfaces/property/property.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { mapPropertyDtoToDef } from "@/shared/utils/mappers.utils";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { PROPERTY_CHECKING_KEYS } from "../query/query.keys";

const useGetPropertiesToApproveQuery = () => {
  return useQuery({
    queryKey: PROPERTY_CHECKING_KEYS.PROPERTIES_TO_CHECK,
    refetchInterval: 60 * 1000,
    queryFn: () =>
      axiosInstance
        .get<
          any,
          AxiosResponse<Dto<PropertyTypeDto[]>>
        >(ENDPOINTS.MODERATOR.PROPERTIES_TO_CHECK)
        .then(({ data }) =>
          data.data.map((property) => mapPropertyDtoToDef(property))
        )
  });
};

export default useGetPropertiesToApproveQuery;
