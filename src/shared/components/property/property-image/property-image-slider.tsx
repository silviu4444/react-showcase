import { PropertyPhotoDto } from "@/shared/interfaces/property/property.interfaces";
import { cn } from "@/shared/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../../ui/carousel";
import PropertyImageItem from "./property-image-item";
import NoImageAvailablePlaceholder from "../no-image-available-placeholder/no-image-available-placeholder";

type PropertyImageSlider = {
  images: PropertyPhotoDto[];
} & React.HTMLAttributes<HTMLElement>;

const PropertyImageSlider: React.FC<PropertyImageSlider> = ({
  className,
  images
}) => {
  return (
    <Carousel>
      <CarouselContent>
        {images.map((img) => (
          <CarouselItem
            key={img.publicId}
            className={cn("relative rounded-md", className)}
          >
            <PropertyImageItem url={img.publicId} />
          </CarouselItem>
        ))}
        {!images.length && <NoImageAvailablePlaceholder className="h-72" />}
      </CarouselContent>
      {!!images.length && (
        <>
          <CarouselPrevious className="absolute bottom-0 left-auto right-10 top-auto" />
          <CarouselNext className="absolute bottom-0 right-1 top-auto" />
        </>
      )}
    </Carousel>
  );
};

export default PropertyImageSlider;
