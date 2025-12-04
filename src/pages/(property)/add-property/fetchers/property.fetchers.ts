import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { Dto } from "@/shared/interfaces/dto.interfaces";
import { PropertyTypeDto } from "@/shared/interfaces/property/property.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { CreateUpdatePropertyDto } from "../interfaces/add-property.interfaces";

export async function createUpdateProperty({
  data,
  propertyId
}: {
  data: Dto<CreateUpdatePropertyDto>;
  propertyId: string | null;
}) {
  if (!!propertyId) {
    return axiosInstance.put<Dto<PropertyTypeDto>>(
      ENDPOINTS.PROPERTY.UPDATE_PROPERTY,
      data
    );
  }

  return axiosInstance.post<Dto<PropertyTypeDto>>(
    ENDPOINTS.PROPERTY.CREATE_PROPERTY,
    data
  );
}
