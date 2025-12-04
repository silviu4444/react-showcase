import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import { LatLngType } from "@/shared/interfaces/forms/address-autocomplete.interfaces";
import {
  BasicSearchFiltersDef,
  QueryFiltersParams,
  QueryFiltersParamsKeys
} from "@/shared/interfaces/property/property.interfaces";
import {
  getTruthySearchParams,
  mapToQueryParams
} from "@/shared/utils/mappers.utils";
import qs from "query-string";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RouterPages } from "../constants/router.constants";

type SetQueriesType = {
  filters: Partial<QueryFiltersParams>;
  merge?: boolean;
};

type QueryFiltersContextType = {
  latLng: LatLngType;
  basicFilters: BasicSearchFiltersDef;
  queryFilters: QueryFiltersParams;
  queryFiltersLength: number;
  setQueries: ({ filters, merge }: SetQueriesType) => void;
};

const SearchFiltersContext = createContext<QueryFiltersContextType>(
  {} as QueryFiltersContextType
);

export function useQueryFilters<T = QueryFiltersContextType>(
  mapper?: (data: QueryFiltersContextType) => T
) {
  const data = useContext(SearchFiltersContext);

  return mapper ? mapper(data) : (data as T);
}

type QueryFiltersCtxProps = {
  children: React.ReactNode;
};
const QueryFiltersCtx: React.FC<QueryFiltersCtxProps> = ({ children }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [queryFilters, setQueryFilters] = useState<QueryFiltersParams>({
    rt:
      (params.get("rt" satisfies QueryFiltersParamsKeys) as RELATION_TYPE) ||
      RELATION_TYPE.RENT,
    pt:
      (params.get("pt" as QueryFiltersParamsKeys) as PROPERTY_TYPE) ||
      PROPERTY_TYPE.APARTMENT,
    city: params.get("city" as QueryFiltersParamsKeys) || ""
  });

  const basicFilters: BasicSearchFiltersDef = useMemo(
    () => ({
      propertyType: queryFilters.pt,
      relationType: queryFilters.rt
    }),
    [queryFilters.rt, queryFilters.pt]
  );

  const latLng: LatLngType = useMemo(() => {
    const lat = queryFilters.lat || params.get("lat" as QueryFiltersParamsKeys);
    const lng = queryFilters.lng || params.get("lng" as QueryFiltersParamsKeys);
    return {
      lat: lat ? +lat : 0,
      lng: lng ? +lng : 0
    };
  }, [queryFilters.lat, queryFilters.lng]);

  const setQueries = ({ filters, merge = true }: SetQueriesType) => {
    const hasBoundsChanged =
      filters.lat &&
      filters.lng &&
      filters.lat !== queryFilters.lat &&
      filters.lng !== queryFilters.lng;
    const mappedFilters = mapToQueryParams({
      form: {
        ...(merge
          ? {
              ...queryFilters,
              page: hasBoundsChanged ? "0" : queryFilters.page
            }
          : {}),
        ...filters
      }
    });
    const url = qs.stringifyUrl({
      url: location.pathname,
      query: mappedFilters
    });
    navigate(url);
  };

  useEffect(() => {
    const doesNotHaveQueryParams =
      Array.from(params.entries()).length < 1 &&
      window.location.pathname === RouterPages.Home;
    doesNotHaveQueryParams && setQueries({ filters: queryFilters });
  }, []);

  useEffect(() => {
    const truthyParams = getTruthySearchParams(
      Object.fromEntries(params.entries()) as unknown as QueryFiltersParams
    );

    setQueryFilters(truthyParams);
  }, [params]);

  const queryFiltersLength = Object.keys(queryFilters).length;

  return (
    <SearchFiltersContext.Provider
      value={{
        queryFilters,
        setQueries,
        basicFilters,
        latLng,
        queryFiltersLength
      }}
    >
      {children}
    </SearchFiltersContext.Provider>
  );
};

export default QueryFiltersCtx;
