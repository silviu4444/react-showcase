import { useAuthState } from "@/core/hooks/auth.state";
import { environment } from "@/environment";
import { useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import useToast from "../hooks/use-toast";
import { ErrorDto } from "../interfaces/dto.interfaces";

const axiosInstance = axios.create({
  baseURL: environment.production ? environment.apiURL : "/api"
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.withCredentials = true;

interface AxiosInterceptorProps {
  children: React.ReactNode;
}

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const { removeUser, user } = useAuthState();
  const { toast } = useToast();
  const client = useQueryClient();

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => response;

    const resErrInterceptor = (error: AxiosError<ErrorDto>) => {
      if (error.response?.status === 401) {
        if (user) {
          removeUser();
          client.resetQueries();
          client.clear();
        }

        if (
          error.response?.data.message?.startsWith(
            "Invalid refresh token: The Token has expired"
          )
        ) {
          toast({
            message: "your-session-has-expired",
            type: "warning"
          });
        }

        switch (error.response?.data.message) {
          case "Access token is blacklisted":
          case "Refresh token is expired":
            toast({
              message: "your-session-has-expired",
              type: "warning"
            });
            break;
        }
      }

      return Promise.reject(error);
    };

    const responseInterceptor = axiosInstance.interceptors.response.use(
      resInterceptor,
      resErrInterceptor
    );

    setMounted(true);

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);

  return mounted ? children : null;
};

export { AxiosInterceptor };
export default axiosInstance;
