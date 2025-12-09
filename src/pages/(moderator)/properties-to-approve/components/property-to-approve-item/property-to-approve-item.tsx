import useFormatPropertyTitle from "@/pages/(search)/map/hooks/use-format-property-title";
import NoImageAvailablePlaceholder from "@/shared/components/property/no-image-available-placeholder/no-image-available-placeholder";
import PropertyCommoditiesBadges from "@/shared/components/property/property-commodities-badges.tsx/property-commodities-badges";
import PropertyImageItem from "@/shared/components/property/property-image/property-image-item";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import usePropertyApprovalMutation from "../../hooks/use-property-approval-mutation";

type PropertyToApproveItemProps = {
  data: PropertyTypeDef;
};

const PropertyToApproveItem: FC<PropertyToApproveItemProps> = ({ data }) => {
  const [t] = useTranslation();
  const { formatPropertyTitle } = useFormatPropertyTitle();
  const { mutate, isPending } = usePropertyApprovalMutation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formatPropertyTitle({ property: data })}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.photos.map(({ publicId }) => (
            <PropertyImageItem
              className="rounded-lg object-contain"
              url={publicId}
            />
          ))}
        </div>

        {!data.photos.length && (
          <NoImageAvailablePlaceholder className="h-72" />
        )}

        <PropertyCommoditiesBadges property={data} />

        <p>{data.description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => mutate({ approves: false, pId: data.id })}
        >
          {t("deny")}
        </Button>

        <Button
          onClick={() => mutate({ approves: true, pId: data.id })}
          disabled={isPending}
        >
          {t("approve")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyToApproveItem;
