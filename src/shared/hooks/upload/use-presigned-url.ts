import { getPresignedUrls } from "@/shared/fetchers/upload.fetchers";
import { useMutation } from "@tanstack/react-query";

const usePresignedUrl = () => {
  return useMutation({ mutationFn: getPresignedUrls, retry: 3 });
};

export default usePresignedUrl;
