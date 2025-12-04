import useFormatPropertyTitle from "@/pages/(search)/map/hooks/use-format-property-title";
import AddToFavoriteButton from "@/shared/components/buttons/add-to-favorite-button";
import PriceBadge from "@/shared/components/property/price-badge/price-badge";
import PropertyImageDemo from "@/shared/components/property/property-image/property-imate-demo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import useDateFormat from "@/shared/hooks/use-date-format";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type OverviewSuggestionsGridItemProps = {
  property: PropertyTypeDef;
};

const OverviewSuggestionsGridItem: React.FC<
  OverviewSuggestionsGridItemProps
> = ({ property }) => {
  const { formatPropertyTitle } = useFormatPropertyTitle();
  const formatDate = useDateFormat();
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/p/${property.id}`);
  };

  return (
    <Card onClick={onClick}>
      <CardHeader className="flex flex-row gap-4">
        <div className="flex w-fit flex-col">
          <div className="flex items-center justify-between gap-2">
            <CardTitle>
              {formatPropertyTitle({ property, displayRelation: true })}
            </CardTitle>

            <AddToFavoriteButton
              propertyId={property.id}
              isFavorite={property.isFavorite}
              ownerId={property.user.id}
            />
          </div>
          <CardDescription className="flex items-center gap-1">
            <IoLocationOutline className="size-5" />

            <span className="dynamic-ellipsis">
              <span className="text-sm leading-[18px]">
                {property.details.address.street}
              </span>
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <PropertyImageDemo className="rounded-lg" />
        <PriceBadge price={property.price} />
        <div className="flex items-center justify-end gap-1">
          <CiCalendar className="size-5" />
          <span className="text-sm leading-4 text-muted-foreground">
            {formatDate({ date: property.createdAt, format: "dd MMMM yyyy" })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewSuggestionsGridItem;
