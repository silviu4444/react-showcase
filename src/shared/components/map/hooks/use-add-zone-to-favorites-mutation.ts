import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import axiosInstance from "@/shared/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AddRegionToFavoriteDto } from "../interfaces/map.interfaces";
import { Dto } from "@/shared/interfaces/dto.interfaces";
import { useMapCoordinatesStore } from "@/pages/(search)/map/hooks/use-map-coordinates-store";
import { getLatLngFromPolyline } from "@/shared/utils/mappers.utils";
import useToast from "@/shared/hooks/use-toast";

const useAddZoneToFavoritesMutation = () => {
  const { polyline } = useMapCoordinatesStore();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => {
      const dto: Dto<AddRegionToFavoriteDto> = {
        data: {
          name: Math.random().toString(),
          locations: getLatLngFromPolyline(polyline!).map(({ lat, lng }) => ({
            latitude: lat,
            longitude: lng
          }))
        }
      };
      return axiosInstance.post(ENDPOINTS.USER.ADD_REGION_TO_FAVORITE, dto);
    },
    onSuccess: () =>
      toast({
        message: "your-selected-region-has-been-added-to-favorite",
        type: "success"
      })
  });
};

export default useAddZoneToFavoritesMutation;
