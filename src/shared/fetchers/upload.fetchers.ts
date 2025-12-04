import { ENDPOINTS } from "../constants/endpoints.constants";
import { Dto } from "../interfaces/dto.interfaces";
import { PresignedUrlDto } from "../interfaces/forms/upload.interfaces";
import axiosInstance from "../lib/axios";

export const getPresignedUrls = (): Promise<PresignedUrlDto> => {
  return axiosInstance
    .get<Dto<PresignedUrlDto>>(ENDPOINTS.SERVICES.PRESIGNED_URL)
    .then((dto) => dto.data.data);
};
