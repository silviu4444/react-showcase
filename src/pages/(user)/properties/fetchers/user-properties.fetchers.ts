import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { Dto } from "@/shared/interfaces/dto.interfaces";
import {
  PropertyTypeDef,
  PropertyTypeDto
} from "@/shared/interfaces/property/property.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { mapPropertyDtoToDef } from "@/shared/utils/mappers.utils";
import { AxiosResponse } from "axios";

export function getUserProperties(): Promise<PropertyTypeDef[]> {
  return axiosInstance
    .get<
      any,
      AxiosResponse<Dto<PropertyTypeDto[]>>
    >(ENDPOINTS.PROPERTY.PROPERTIES_BY_USER)
    .then((data) =>
      data.data.data.map((property) => mapPropertyDtoToDef(property))
    );
}
