import useUploadImage from "@/shared/hooks/upload/use-upload-image";
import { UploadPhotoDto } from "@/shared/interfaces/forms/images-uploader.interfaces";
import { useEffect } from "react";
import { LuX } from "react-icons/lu";
import TryAgainButton from "../../buttons/try-again-button";
import PropertyImageItem from "../../property/property-image/property-image-item";
import { Button } from "../../ui/button";
import Spinner from "../../ui/spinner";

type ImageUploaderItemProps = {
  imageId: string;
  publicId?: string;
  source?: string;
  signature?: string;
  timestamp?: number;
  onImageUploaded: (data: UploadPhotoDto) => void;
  onRemoveImage: (imageId: string) => void;
};

const ImageUploaderItem: React.FC<ImageUploaderItemProps> = ({
  imageId,
  publicId,
  source = "",
  signature,
  timestamp,
  onImageUploaded,
  onRemoveImage
}) => {
  const { mutate, isPending, isError, isSuccess, data } = useUploadImage();

  useEffect(() => {
    if (source && signature && timestamp) {
      mutate({ b64Src: source, signature, timestamp });
    }
  }, [source, signature, timestamp]);

  useEffect(() => {
    if (isSuccess) {
      onImageUploaded({
        imageId,
        publicId: data.public_id,
        signature,
        timestamp,
        version: data.version
      });
    }
  }, [isSuccess]);

  const onRetry = () => {
    if (source && signature && timestamp) {
      mutate({ b64Src: source, signature, timestamp });
    }
  };

  let content = (
    <div className="relative aspect-square size-full rounded-md">
      <Button
        variant="destructive"
        size="icon"
        type="button"
        className="absolute -right-2 -top-2 size-6 rounded-full border-2 border-background"
        onClick={() => onRemoveImage(imageId)}
      >
        <LuX />
      </Button>
      <PropertyImageItem url={data?.public_id || publicId} />
    </div>
  );

  if (isPending) {
    content = (
      <div className="h-[250px] w-full">
        <Spinner center />
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="h-[250px] w-full">
        <TryAgainButton onRetry={onRetry} />
      </div>
    );
  }

  return <div className="relative aspect-square rounded-md">{content}</div>;
};

export default ImageUploaderItem;
