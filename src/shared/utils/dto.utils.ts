import { AxiosResponse } from "axios";
import { Dto, DtoWithPagination } from "../interfaces/dto.interfaces";

export const mapDto =
  <T>() =>
  (response: AxiosResponse<Dto<T>>) =>
    response.data.data;

export const mapDtoWithPagination =
  <T>() =>
  (response: AxiosResponse<DtoWithPagination<T>>) =>
    response.data;
