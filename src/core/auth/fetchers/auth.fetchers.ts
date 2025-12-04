import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { i18nSupported } from "@/shared/constants/i18n.constants";
import { Dto, DtoWithMeta } from "@/shared/interfaces/dto.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { mapUserDtoToDef } from "@/shared/utils/mappers.utils";
import { AxiosResponse } from "axios";
import { LoginFields } from "../components/login";
import { RegisterFields } from "../components/register";
import { LoginDto, RegisterDto } from "../interfaces/auth.interfaces";
import { UserDef, UserDto } from "../interfaces/user.interfaces";

const postRegister = async (
  payload: RegisterFields,
  language: i18nSupported
): Promise<any> => {
  try {
    const formattedPayload: DtoWithMeta<
      RegisterDto,
      { language: i18nSupported }
    > = {
      data: {
        ...payload,
        firstName: payload.firstName.trim(),
        lastName: payload.lastName.trim(),
        email: payload.email.trim()
      },
      meta: {
        language
      }
    };

    await axiosInstance.post<any, AxiosResponse<Dto<any>>>(
      ENDPOINTS.AUTH.REGISTER,
      formattedPayload
    );
  } catch (error) {
    throw error;
  }
};

const postLogin = async (payload: LoginFields): Promise<UserDef> => {
  try {
    const formattedPayload: LoginDto = {
      username: payload.email.trim(),
      password: payload.password
    };

    const {
      data: { data: user }
    } = await axiosInstance.post<any, AxiosResponse<Dto<UserDto>>>(
      ENDPOINTS.AUTH.LOGIN,
      formattedPayload
    );
    return mapUserDtoToDef(user);
  } catch (error) {
    throw error;
  }
};

const postLogout = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.post<any, AxiosResponse<any>>(
      ENDPOINTS.AUTH.LOGOUT
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export { postLogin, postLogout, postRegister };
