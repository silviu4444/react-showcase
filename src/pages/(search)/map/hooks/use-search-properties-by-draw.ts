import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import useToast from "@/shared/hooks/use-toast";
import { BasicSearchFiltersDef } from "@/shared/interfaces/property/property.interfaces";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SearchMapQueryKeys } from "../constants/query-keys.constants";
import { searchByDraw } from "../fetchers/map.fetchers";

type Polyline = google.maps.Polyline;

type useSearchPropertiesByDrawProps = {
  polyline: Polyline | null;
  basicFilters: BasicSearchFiltersDef;
};

const useSearchPropertiesByDraw = ({
  basicFilters,
  polyline
}: useSearchPropertiesByDrawProps) => {
  const { toast } = useToast();
  const isAuthenticated = useIsAuthenticated();

  const { data, isSuccess, isError, error, ...rest } = useQuery({
    queryKey: SearchMapQueryKeys.SEARCH_BY_DRAW({
      polyline,
      ...basicFilters
    }),
    queryFn: () =>
      searchByDraw(
        {
          polyline: polyline as any,
          ...basicFilters
        },
        isAuthenticated
      ),
    placeholderData: keepPreviousData
  });

  useEffect(() => {
    if (data && isSuccess) {
      data.pins.length === 0 &&
        toast({
          message: "no-properties-found-in-the-selected-area",
          type: "warning"
        });
    }

    if (isError) {
      error?.message === "Selected zone is too big" &&
        toast({
          message: "the-selected-zone-is-too-big",
          type: "warning"
        });
    }
  }, [data, isSuccess, isError, error]);

  return {
    data,
    isSuccess,
    isError,
    error,
    ...rest
  };
};

export default useSearchPropertiesByDraw;
