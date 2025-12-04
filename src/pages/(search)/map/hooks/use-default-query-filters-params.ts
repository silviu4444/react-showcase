import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import {
  QueryFiltersParams,
  QueryFiltersParamsKeys
} from "@/shared/interfaces/property/property.interfaces";
import qs from "query-string";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const useDefaultQueryFiltersParams = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const propertyType = params.get("pt" satisfies QueryFiltersParamsKeys);
    if (!propertyType) {
      const defaultParams: QueryFiltersParams = {
        pt: PROPERTY_TYPE.APARTMENT,
        rt: RELATION_TYPE.RENT
      };
      const url = qs.stringifyUrl({
        url: location.pathname,
        query: defaultParams
      });
      navigate(url);
    }
  }, [params]);
};

export default useDefaultQueryFiltersParams;
