import useFormatPropertyTitle from "@/pages/(search)/map/hooks/use-format-property-title";
import PropertyBadges from "@/shared/components/property/property-commodities-badges.tsx/property-commodities-badges";
import PropertyImageItem from "@/shared/components/property/property-image/property-image-item";
import PropertyViews from "@/shared/components/property/property-views/property-views";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { IoLocationOutline } from "react-icons/io5";
import UserPropertyGridItemActions from "./user-properties-grid-item-actions";

type UserPropertiesGridItemProps = {
  property: PropertyTypeDef;
};

const UserPropertiesGridItem: React.FC<UserPropertiesGridItemProps> = ({
  property
}) => {
  const { formatPropertyTitle } = useFormatPropertyTitle();
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row gap-4">
        <div className="flex w-fit flex-col">
          <div className="flex items-center gap-1">
            <div className="dynamic-ellipsis">
              <CardTitle>{formatPropertyTitle({ property })}</CardTitle>
            </div>
            <UserPropertyGridItemActions propertyId={property.id} />
          </div>
          <CardDescription className="flex items-center gap-1">
            <IoLocationOutline className="size-5" />

            <span className="dynamic-ellipsis">
              <span>{property.details.address.street}</span>
            </span>

            <PropertyViews className="text-foreground" views={property.views} />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <PropertyImageItem
          className="w-full rounded-md"
          url={property.photos[0]?.publicId}
        />
        <PropertyBadges className="h-fit w-full" property={property} />
      </CardContent>
    </Card>
  );
};

export default UserPropertiesGridItem;
