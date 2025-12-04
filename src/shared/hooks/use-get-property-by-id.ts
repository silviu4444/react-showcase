import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import { QueryKeys } from "@/shared/constants/query-keys.constants";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getPropertyById } from "../fetchers/property.fetchers";
import { ErrorDto } from "../interfaces/dto.interfaces";
import { PropertyTypeDef } from "../interfaces/property/property.interfaces";

type UseGetPropertyByIdProps = {
  propertyId: string | null | undefined;
};

const useGetPropertyById = ({ propertyId }: UseGetPropertyByIdProps) => {
  const isAuthenticated = useIsAuthenticated();
  return useQuery<PropertyTypeDef, AxiosError<ErrorDto>>({
    queryFn: () => getPropertyById(propertyId!, isAuthenticated),
    queryKey: QueryKeys.PROPERTY.propertyById(propertyId!),
    enabled: !!propertyId
  });
};

export default useGetPropertyById;
