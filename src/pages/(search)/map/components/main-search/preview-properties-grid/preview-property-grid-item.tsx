import { useIsAuthenticated } from "@/core/hooks/use-is-authenticated";
import useFormatPropertyTitle from "@/pages/(search)/map/hooks/use-format-property-title";
import AddToFavoriteButton from "@/shared/components/buttons/add-to-favorite-button";
import PriceBadge from "@/shared/components/property/price-badge/price-badge";
import PropertyImageItem from "@/shared/components/property/property-image/property-image-item";
import { Badge } from "@/shared/components/ui/badge";
import { PROPERTY_TYPE } from "@/shared/constants/property.constants";
import { QueryKeys } from "@/shared/constants/query-keys.constants";
import { getPropertyById } from "@/shared/fetchers/property.fetchers";
import useTrackHoverInterest from "@/shared/hooks/use-track-hover-interest";
import { PropertyPreviewDef } from "@/shared/interfaces/property/property.interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { FaShower } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";

type PreviewPropertyGridItemProps = {
  property: PropertyPreviewDef;
  propertyType: PROPERTY_TYPE;
  onClick: (propertyId: string) => void;
};

const PreviewPropertyGridItem: FC<PreviewPropertyGridItemProps> = ({
  property,
  propertyType,
  onClick
}) => {
  const isAuthenticated = useIsAuthenticated();
  const client = useQueryClient();
  const { ref, isInterested } = useTrackHoverInterest({
    interestedAfterMs: 1500
  });

  useEffect(() => {
    const alreadyFetched = client.getQueryData(
      QueryKeys.PROPERTY.propertyById(property.id)
    );
    if (isInterested && !alreadyFetched) {
      client.prefetchQuery({
        queryKey: QueryKeys.PROPERTY.propertyById(property.id),
        queryFn: () => getPropertyById(property.id, isAuthenticated)
      });
    }
  }, [isInterested]);

  const { formatPreviewTitle } = useFormatPropertyTitle();
  return (
    <article
      className="box-border flex h-[150px] w-full rounded-lg border"
      onClick={() => onClick(property.id)}
      ref={ref}
    >
      <PropertyImageItem
        className="rounded-l-md rounded-r-none"
        url={property.photos[0]?.publicId}
      />

      <div className="flex w-[calc(100%-150px)] flex-col gap-1 p-2">
        <h1 className="inline-block truncate">
          {formatPreviewTitle({ property, propertyType })}
        </h1>
        <div className="flex items-center gap-1 text-muted-foreground">
          <IoLocationOutline className="size-5" />
          <span className="truncate text-sm leading-[18px]">
            {property.details.address.street}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <PriceBadge price={property.price} />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          <Badge variant="outline">
            <MdMeetingRoom className="size-4" />
            {property.details.roomNumber}
          </Badge>

          <Badge variant="outline">
            <FaShower className="size-4" />
            {property.details.bathroomNumber}
          </Badge>
          <AddToFavoriteButton
            className="ml-auto size-8"
            propertyId={property.id}
            isFavorite={property.isFavorite}
            ownerId={property.ownerId}
          />
        </div>
      </div>
    </article>
  );
};

export default PreviewPropertyGridItem;
