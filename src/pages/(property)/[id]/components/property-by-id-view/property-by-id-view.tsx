import useFormatPropertyTitle from "@/pages/(search)/map/hooks/use-format-property-title";
import AddToFavoriteButton from "@/shared/components/buttons/add-to-favorite-button";
import Map from "@/shared/components/map/map";
import NoImageAvailablePlaceholder from "@/shared/components/property/no-image-available-placeholder/no-image-available-placeholder";
import PriceBadge from "@/shared/components/property/price-badge/price-badge";
import PropertyCommoditiesBadges from "@/shared/components/property/property-commodities-badges.tsx/property-commodities-badges";
import PropertyContractDetailsBadges from "@/shared/components/property/property-contract-details-badges/property-contract-details-badges";
import PropertyImageItem from "@/shared/components/property/property-image/property-image-item";
import PropertyListedDate from "@/shared/components/property/property-listed-date/property-listed-date";
import PropertyUserAvatar from "@/shared/components/property/property-user-avatar/property-user-avatar";
import PropertyViews from "@/shared/components/property/property-views/property-views";
import SharePropertyButton from "@/shared/components/property/share-property-button/share-property-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/shared/components/ui/carousel";
import Container from "@/shared/components/ui/container";
import useFormatPropertyAddress from "@/shared/hooks/use-format-property-address";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import GoogleMapsApiLoader from "@/shared/providers/google-map.provider";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { IoLocationOutline } from "react-icons/io5";
import PropertyActions from "./property-actions/property-actions";

type PropertyByIdViewProps = {
  property: PropertyTypeDef;
};

const PropertyByIdView: FC<PropertyByIdViewProps> = ({ property }) => {
  const { formatPropertyTitle } = useFormatPropertyTitle();
  const [t] = useTranslation();
  const formatAddress = useFormatPropertyAddress();

  return (
    <div className="flex flex-col">
      <Carousel className="w-full overflow-x-hidden">
        <CarouselContent>
          {property.photos.map(({ publicId }) => (
            <CarouselItem className="h-[80dvh]" key={publicId}>
              <PropertyImageItem
                className="rounded-none object-contain"
                url={publicId}
              />
            </CarouselItem>
          ))}
          {!property.photos.length && (
            <NoImageAvailablePlaceholder className="h-72" />
          )}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 md:left-4" />
        <CarouselNext className="absolute right-2 md:right-4" />
      </Carousel>
      <Container className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <PropertyListedDate
            createdAt={property.createdAt}
            updatedAt={property.updatedAt}
          />
          <div className="h-2 rounded-md border-l-[1px] border-solid border-foreground"></div>
          <PropertyViews views={property.views} />
        </div>

        <div className="flex items-center justify-between gap-2">
          <h1 className="text-lg font-semibold">
            {formatPropertyTitle({ property, displayRelation: true })}
          </h1>

          <div className="flex items-center gap-1">
            <AddToFavoriteButton
              propertyId={property.id}
              isFavorite={property.isFavorite}
              ownerId={property.user.id}
            />

            <SharePropertyButton propertyId={property.id} />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <PriceBadge
            className="sm:w-fit"
            label="price"
            price={property.price}
          />
          {!!property.contractDetails.agencyFee.amount && (
            <PriceBadge
              className="sm:w-fit"
              label="agency-fee"
              variant="outline"
              price={property.contractDetails.agencyFee}
            />
          )}
          {!!property.expensesMonthly.amount && (
            <PriceBadge
              className="sm:w-fit"
              variant="outline"
              label="monthly-expenses"
              price={property.expensesMonthly}
            />
          )}
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <Card className="basis-full lg:basis-1/2">
            <CardHeader>
              <CardTitle>{t("contact-info")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <PropertyUserAvatar user={property.user} />
              <PropertyActions
                className="flex-grow lg:basis-1/2"
                propertyData={property}
                withoutFavoriteButton
              />
            </CardContent>
          </Card>

          <Card className="basis-full lg:basis-1/2">
            <CardHeader>
              <CardTitle>{t("contract-details")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <PropertyContractDetailsBadges propertyData={property} />
            </CardContent>
          </Card>

          <Card className="basis-full lg:basis-1/2">
            <CardHeader>
              <CardTitle>{t("commodities")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <PropertyCommoditiesBadges property={property} />
            </CardContent>
          </Card>
        </div>

        {property.description && (
          <Card className="mt-2">
            <CardHeader>
              <CardTitle>{t("description")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <span className="text-sm">{property.description}</span>
            </CardContent>
          </Card>
        )}

        <div className="mt-2 flex flex-col gap-2">
          <h2 className="flex items-center leading-none tracking-tight">
            <IoLocationOutline className="size-5" />
            {formatAddress(property)}
          </h2>
          <div className="h-full w-full overflow-hidden rounded-lg">
            <GoogleMapsApiLoader libraries={["drawing", "marker"]}>
              <Map
                defaultCenter={{
                  lat: property.details.address.latitude,
                  lng: property.details.address.longitude
                }}
                defaultZoom={18}
                width="100%"
                height={400}
              >
                <AdvancedMarker
                  position={{
                    lat: property.details.address.latitude,
                    lng: property.details.address.longitude
                  }}
                />
              </Map>
            </GoogleMapsApiLoader>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PropertyByIdView;
