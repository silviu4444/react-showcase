import { RoleType } from "@/core/auth/interfaces/auth.interfaces";
import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { USER_MANAGEMENT_PREFIX } from "@/shared/constants/query-keys.constants";
import useToast from "@/shared/hooks/use-toast";
import { Dto } from "@/shared/interfaces/dto.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type UpdateUserRoleDto = {
  userId: string;
  role: RoleType;
};

const useChangeUserRoleMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: (payload: UpdateUserRoleDto) => {
      const dto: Dto<UpdateUserRoleDto> = {
        data: payload
      };
      return axiosInstance.post(ENDPOINTS.ADMIN.CHANGE_USER_ROLE, dto);
    }
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      client.invalidateQueries({
        predicate: ({ queryKey }) => queryKey[0] === USER_MANAGEMENT_PREFIX
      });

      toast({
        message: "user-role-has-been-updated",
        type: "success"
      });
    }
  }, [mutation.isSuccess]);

  return mutation;
};

export default useChangeUserRoleMutation;
