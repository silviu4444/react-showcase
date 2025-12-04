import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { BasicSearchFiltersDef } from "@/shared/interfaces/property/property.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { mapDto } from "@/shared/utils/dto.utils";
import { getMapCornersFromBounds } from "@/shared/utils/mappers.utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { SearchMapQueryKeys } from "../constants/query-keys.constants";
import {
  DrawToSearchPropertiesDto,
  DrawToSearchPropertyResponseDto
} from "../interfaces/search.interfaces";

type useSearchPropertiesByBoundsProps = {
  bounds: google.maps.LatLngBounds | null;
  basicFilters: BasicSearchFiltersDef;
  enabled: boolean;
};

const useSearchPropertiesByBounds = ({
  basicFilters,
  bounds,
  enabled
}: useSearchPropertiesByBoundsProps) => {
  const isAuthenticated = useIsAuthenticated();

  return useQuery({
    placeholderData: keepPreviousData,
    enabled,
    queryKey: SearchMapQueryKeys.SEARCH_BY_BOUNDS({
      bounds,
      ...basicFilters
    }),
    queryFn: () => {
      const corners = getMapCornersFromBounds(bounds as any);
      const dto: DrawToSearchPropertiesDto = {
        data: {
          ...basicFilters,
          geoCoordinates: [
            {
              latitude: corners.northeast.lat,
              longitude: corners.northeast.lng
            },
            {
              latitude: corners.northwest.lat,
              longitude: corners.northwest.lng
            },
            {
              latitude: corners.southwest.lat,
              longitude: corners.southwest.lng
            },
            {
              latitude: corners.southeast.lat,
              longitude: corners.southeast.lng
            },
            {
              latitude: corners.northeast.lat,
              longitude: corners.northeast.lng
            }
          ]
        }
      };

      return axiosInstance
        .post<
          DrawToSearchPropertiesDto,
          AxiosResponse<DrawToSearchPropertyResponseDto>
        >(ENDPOINTS.PROPERTY.DRAW_TO_SEARCH(isAuthenticated), dto)
        .then(mapDto());
    }
  });
};

export default useSearchPropertiesByBounds;
