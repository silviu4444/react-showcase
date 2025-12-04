import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { Dto } from "@/shared/interfaces/dto.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { mapDto } from "@/shared/utils/dto.utils";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import {
  CreateMessageDto,
  MessageDto
} from "../interfaces/messages.interfaces";

const useSendMessage = () => {
  return useMutation({
    mutationFn: (message: CreateMessageDto) => {
      const dto: Dto<CreateMessageDto> = {
        data: message
      };

      return axiosInstance
        .post<
          any,
          AxiosResponse<Dto<MessageDto>>
        >(ENDPOINTS.MESSAGE.SEND_MESSAGE, dto)
        .then(mapDto());
    }
  });
};

export default useSendMessage;
