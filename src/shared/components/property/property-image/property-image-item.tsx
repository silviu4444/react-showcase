import { cn } from "@/shared/lib/utils";
import { mapToPropertyImageSrc } from "@/shared/utils/cdn.utils";
import NoImageAvailablePlaceholder from "../no-image-available-placeholder/no-image-available-placeholder";

type PropertyImageItemProps = {
  url: string | undefined;
} & React.HTMLAttributes<HTMLImageElement>;

const PropertyImageItem: React.FC<PropertyImageItemProps> = ({
  url,
  className,
  ...props
}) => {
  if (!url) {
    return <NoImageAvailablePlaceholder className={className} />;
  }

  return (
    <img
      {...props}
      src={mapToPropertyImageSrc(url)}
      className={cn(
        "aspect-square size-full rounded-[inherit] object-cover",
        className
      )}
    />
  );
};

export default PropertyImageItem;
