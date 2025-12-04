import { useIsUploadingPhotos } from "@/shared/hooks/upload/use-is-uploading-photos";
import usePresignedUrl from "@/shared/hooks/upload/use-presigned-url";
import useToast from "@/shared/hooks/use-toast";
import { UploadPhotoDto } from "@/shared/interfaces/forms/images-uploader.interfaces";
import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

type useImagesUploaderProps = {
  initialUploadedSources: UploadPhotoDto[];
  uploadLimit: number;
};

const useImagesUploader = ({
  initialUploadedSources = [],
  uploadLimit
}: useImagesUploaderProps) => {
  const { toast } = useToast();
  const [uploadedSources, setUploadedSources] = useState<UploadPhotoDto[]>(
    initialUploadedSources
  );
  const [newSources, setNewSources] = useState<string[]>([]);
  const [uploadMeta, setUploadMeta] = useState<UploadPhotoDto[]>([]);

  const totalImages = uploadedSources.length + uploadMeta.length;

  const { mutate, data: presignedUrl, isPending } = usePresignedUrl();

  const { setIsUploading } = useIsUploadingPhotos();

  useEffect(() => {
    setIsUploading(isPending ? true : uploadMeta.length === 0 ? false : true);
  }, [uploadMeta, isPending]);

  const onImageUploaded = (data: UploadPhotoDto) => {
    setUploadedSources((currValue) => [...currValue, data]);
    setUploadMeta((currValue) =>
      currValue.filter((item) => item.imageId !== data.imageId)
    );
  };

  useEffect(() => {
    if (newSources.length && presignedUrl) {
      setUploadMeta(
        newSources.map((source) => ({
          imageId: uuidv4(),
          source,
          signature: presignedUrl.signature,
          timestamp: presignedUrl.timestamp
        }))
      );
    }
  }, [newSources, presignedUrl]);

  useEffect(() => {
    !presignedUrl && newSources.length && mutate();
  }, [newSources, presignedUrl]);

  const setSourcesToB64 = (images: FileList) => {
    if (!totalImages && images.length > uploadLimit) {
      toast({
        message: ["upload-image-limitation-at-once", { uploadLimit }],
        type: "warning"
      });
      return;
    }

    if (totalImages + images.length > uploadLimit) {
      toast({
        message: [
          "upload-image-limitation",
          {
            uploadLimit,
            uploadsLeft: uploadLimit - totalImages
          }
        ],
        type: "warning"
      });
      return;
    }

    const sourcesPromise: Promise<string>[] = [];
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      const filePromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

      sourcesPromise.push(filePromise);
      reader.readAsDataURL(images[i]);
    }

    Promise.all(sourcesPromise).then((results) => setNewSources(results));
  };

  return {
    onImageUploaded,
    setSources: setSourcesToB64,
    uploadedSources,
    uploadMeta,
    presignedUrl,
    setUploadedSources,
    hasReachedLimit: uploadedSources.length >= uploadLimit,
    isEmpty: !uploadedSources.length && !uploadMeta.length
  };
};

export default useImagesUploader;
