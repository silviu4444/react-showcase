import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import axiosInstance from "@/shared/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROPERTY_CHECKING_KEYS } from "../query/query.keys";

const usePropertyApprovalMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: ({ approves, pId }: { approves: boolean; pId: string }) =>
      axiosInstance.post(ENDPOINTS.MODERATOR.SUBMIT_APPROVAL(approves, pId)),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: PROPERTY_CHECKING_KEYS.PROPERTIES_TO_CHECK
      });
    }
  });
};

export default usePropertyApprovalMutation;
