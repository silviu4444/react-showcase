import { environment } from "@/environment";
import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import { useMutation } from "@tanstack/react-query";

type UploadImagePayload = {
  signature: string;
  timestamp: number;
  b64Src: string;
};

type CloudinaryUploadResponse = {
  api_key: string;
  asset_id: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
};

const uploadImage = ({
  b64Src,
  signature,
  timestamp
}: UploadImagePayload): Promise<CloudinaryUploadResponse> => {
  const data = new FormData();
  data.append("file", b64Src);
  data.append("api_key", environment.cloudinary.cloudinaryApiKey);
  data.append("signature", signature);
  data.append("timestamp", timestamp.toString());
  return fetch(
    ENDPOINTS.CLOUDINARY.UPLOAD_IMAGE(
      environment.cloudinary.cloudinaryCloudName
    ),
    { body: data, method: "POST" }
  ).then((response) => response.json() as Promise<CloudinaryUploadResponse>);
};

const useUploadImage = () => {
  return useMutation({ mutationFn: uploadImage });
};

export default useUploadImage;
