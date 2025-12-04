import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import useToast from "@/shared/hooks/use-toast";
import axiosInstance from "@/shared/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const useLockUserByEmailMutation = () => {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (email: string) => {
      return axiosInstance.put(ENDPOINTS.ADMIN.LOCK_USER(email));
    }
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      toast({
        message: "the-user-has-been-locked",
        type: "info"
      });
    }
  }, [mutation.isSuccess]);

  return mutation;
};

export default useLockUserByEmailMutation;
