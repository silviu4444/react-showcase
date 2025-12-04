import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { Dto } from "@/shared/interfaces/dto.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export function useToggleFavoriteMutation() {
  return useMutation({
    mutationFn: ({ propertyId }: { propertyId: string }) =>
      axiosInstance
        .post<
          any,
          AxiosResponse<Dto<{ isFavorite: boolean }>>
        >(ENDPOINTS.PROPERTY.TOGGLE_FAVORITE(propertyId))
        .then(({ data }) => data.data)
  });
}
