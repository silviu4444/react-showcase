import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import { PaginationData } from "@/shared/components/custom-pagination/custom-pagination";
import { DEFAULT_CACHE_TIME } from "@/shared/constants/query-keys.constants";
import { PropertyPreviewDef } from "@/shared/interfaces/property/property.interfaces";
import { useQueryFilters } from "@/shared/providers/query-filters-provider";
import {
  keepPreviousData,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import { useEffect } from "react";
import { SearchMapQueryKeys } from "../constants/query-keys.constants";
import { previewProperties } from "../fetchers/map.fetchers";
import { useMapCoordinatesStore } from "./use-map-coordinates-store";

export type PreviewPropertiesData = {
  list: PropertyPreviewDef[];
  pageData: PaginationData;
};

const usePreviewProperties = () => {
  const { propertyType, relationType, page, setQueries } = useQueryFilters(
    ({ basicFilters, queryFilters, setQueries }) => ({
      propertyType: basicFilters.propertyType,
      relationType: basicFilters.relationType,
      page: queryFilters.page ? +queryFilters.page : 0,
      setQueries
    })
  );
  const { bounds, polyline } = useMapCoordinatesStore();
  const queryClient = useQueryClient();
  const isAuthenticated = useIsAuthenticated();

  const { data, isPlaceholderData, ...rest } = useQuery({
    queryFn: ({ signal }) => {
      return previewProperties({
        bounds,
        polyline,
        basicFilters: {
          relationType,
          propertyType
        },
        page,
        signal,
        isAuthenticated
      });
    },
    queryKey: SearchMapQueryKeys.previewProperties({
      polyline,
      bounds,
      propertyType,
      relationType,
      page
    }),
    enabled: () => !!(polyline || bounds) && !!relationType && !!propertyType,
    placeholderData: keepPreviousData,
    staleTime: DEFAULT_CACHE_TIME
  });

  useEffect(() => {
    const shouldPrefetchNextPage =
      !isPlaceholderData &&
      !!data?.pageData.lastPage &&
      data.pageData.lastPage > page;

    if (shouldPrefetchNextPage) {
      queryClient.prefetchQuery({
        queryKey: SearchMapQueryKeys.previewProperties({
          polyline: polyline,
          bounds: bounds,
          propertyType: propertyType,
          relationType: relationType,
          page: page + 1
        }),
        queryFn: ({ signal }) =>
          previewProperties({
            bounds,
            polyline,
            basicFilters: {
              relationType,
              propertyType
            },
            page: page + 1,
            signal,
            isAuthenticated
          })
      });
    }
  }, [isPlaceholderData, data?.pageData.lastPage, page]);

  return {
    data,
    page,
    setPage: (page: number) =>
      setQueries({ filters: { page: page.toString() } }),
    isPlaceholderData,
    ...rest
  };
};

export default usePreviewProperties;
