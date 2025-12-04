import { useIsUploadingPhotos } from "@/shared/hooks/upload/use-is-uploading-photos";
import { UploadPhotoDto } from "@/shared/interfaces/forms/images-uploader.interfaces";
import { LucideImageUp, LucideUpload } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LuTrash, LuUpload } from "react-icons/lu";
import { Button } from "../../ui/button";
import UploadImageInput from "../image-upload-input/image-upload-input";
import ImageUploaderItem from "./image-uploader-item";
import useImagesUploader from "./use-images-uploader";

type ImageUploaderType = {
  data?: UploadPhotoDto[];
  uploadLimit?: number;
  disabled?: boolean;
  /**
   * Returns each uploaded image.
   */
  onChange: (value: UploadPhotoDto[]) => void;
};

const ImageUploader: React.FC<ImageUploaderType> = ({
  data = [],
  uploadLimit = 8,
  disabled,
  onChange
}) => {
  const [t] = useTranslation();

  const {
    isEmpty,
    hasReachedLimit,
    setSources,
    presignedUrl,
    onImageUploaded,
    uploadMeta,
    uploadedSources,
    setUploadedSources
  } = useImagesUploader({
    initialUploadedSources: data,
    uploadLimit
  });

  const { isUploadingPhotos } = useIsUploadingPhotos();

  useEffect(() => {
    uploadedSources.length > 0 && onChange(uploadedSources);
  }, [uploadedSources]);

  const onRemoveAllImages = () => {
    setUploadedSources([]);
    onChange([]);
  };

  const onRemoveImage = (imageId: string) => {
    setUploadedSources((currValue) =>
      currValue.filter((data) => data.imageId !== imageId)
    );

    uploadedSources.length === 1 && onChange([]);
  };

  let content = !!(uploadedSources.length || uploadMeta.length) && (
    <div className="flex w-full flex-col items-start justify-start gap-3">
      <div className="flex w-full flex-col items-center justify-between gap-2 sm:flex-row">
        <span className="truncate text-sm">
          {t("uploaded-images-count", {
            start: uploadedSources.length + uploadMeta.length,
            end: uploadLimit
          })}
        </span>
        <div className="flex gap-2">
          {!hasReachedLimit && (
            <UploadImageInput
              size="sm"
              onImageUpload={(images) => images && setSources(images)}
              multiple
              disabled={isUploadingPhotos || disabled}
            >
              <LuUpload />
              {t("add-more")}
            </UploadImageInput>
          )}
          <Button
            size="sm"
            variant="outline"
            disabled={isUploadingPhotos || disabled}
            onClick={onRemoveAllImages}
          >
            <LuTrash />
            {t("remove-all")}
          </Button>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
        {[...uploadedSources, ...uploadMeta].map(
          ({ source, imageId, publicId }: UploadPhotoDto) => (
            <ImageUploaderItem
              key={imageId}
              signature={presignedUrl?.signature}
              timestamp={presignedUrl?.timestamp}
              publicId={publicId}
              imageId={imageId}
              source={source}
              onImageUploaded={onImageUploaded}
              onRemoveImage={onRemoveImage}
            />
          )
        )}
      </div>
    </div>
  );

  if (isEmpty) {
    content = (
      <div className="flex flex-col items-center">
        <div className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background">
          <LucideImageUp className="opacity-60" />
        </div>
        <span className="mb-1.5 text-sm font-medium">
          {t("drop-your-image-here-or-click-to-browse")}
        </span>
        <UploadImageInput
          className="mt-4"
          onImageUpload={(images) => images && setSources(images)}
          multiple
          disabled={isUploadingPhotos || disabled}
        >
          <LucideUpload />
          {t("upload-photos")}
        </UploadImageInput>
      </div>
    );
  }

  return (
    <div className="has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:items-start! relative flex min-h-52 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-input p-4 transition-colors has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50">
      {content}
    </div>
  );
};

export default ImageUploader;
