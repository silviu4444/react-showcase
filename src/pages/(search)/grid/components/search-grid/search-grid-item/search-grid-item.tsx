import useFormatPropertyTitle from "@/pages/(search)/map/hooks/use-format-property-title";
import AddToFavoriteButton from "@/shared/components/buttons/add-to-favorite-button";
import PriceBadge from "@/shared/components/property/price-badge/price-badge";
import PropertyBadges from "@/shared/components/property/property-commodities-badges.tsx/property-commodities-badges";
import PropertyImageDemo from "@/shared/components/property/property-image/property-imate-demo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import useDateFormat from "@/shared/hooks/use-date-format";
import useFormatPropertyAddress from "@/shared/hooks/use-format-property-address";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type SearchGridItemProps = {
  property: PropertyTypeDef;
};

const SearchGridItem: React.FC<SearchGridItemProps> = ({ property }) => {
  const navigate = useNavigate();
  const { formatPropertyTitle } = useFormatPropertyTitle();
  const formatDate = useDateFormat();
  const formatAddress = useFormatPropertyAddress();

  const onClick = () => {
    navigate(`/p/${property.id}`);
  };
  return (
    <Card
      className="flex flex-col overflow-hidden md:flex-row"
      onClick={onClick}
    >
      <PropertyImageDemo className="h-full w-full md:w-64 md:rounded-br-none md:rounded-tr-none" />
      <div className="flex flex-col">
        <CardHeader className="py-2">
          <CardTitle className="inline-block truncate font-semibold">
            <div className="flex items-center justify-between gap-2">
              <CardTitle>{formatPropertyTitle({ property })}</CardTitle>

              <AddToFavoriteButton
                propertyId={property.id}
                isFavorite={property.isFavorite}
                ownerId={property.user.id}
              />
            </div>
          </CardTitle>
          <CardDescription className="flex items-center gap-1">
            <IoLocationOutline className="size-5 min-w-5" />
            <span className="truncate">{formatAddress(property)}</span>
            <PriceBadge price={property.price} className="ml-auto w-fit" />
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full pb-2">
          <article className="flex h-full flex-col gap-2 md:flex-row">
            <div className="flex w-full flex-col gap-2">
              <PropertyBadges property={property} />

              <div className="mt-auto flex items-center justify-end gap-1">
                <CiCalendar className="size-5" />
                <span className="text-sm leading-3 text-muted-foreground">
                  {formatDate({
                    date: property.createdAt,
                    format: "dd MMMM yyyy"
                  })}
                </span>
              </div>
            </div>
          </article>
        </CardContent>
      </div>
    </Card>
  );
};

export default SearchGridItem;
