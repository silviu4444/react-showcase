import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";

import PriceBadge from "@/shared/components/property/price-badge/price-badge";
import PropertyImageSlider from "@/shared/components/property/property-image/property-image-slider";
import PropertyListedDate from "@/shared/components/property/property-listed-date/property-listed-date";
import PropertyViews from "@/shared/components/property/property-views/property-views";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";
import PropertyContractDetailsBadges from "@/shared/components/property/property-contract-details-badges/property-contract-details-badges";
import PropertyCommoditiesBadges from "@/shared/components/property/property-commodities-badges.tsx/property-commodities-badges";
import PropertyUserAvatar from "@/shared/components/property/property-user-avatar/property-user-avatar";

type Props = {
  property: PropertyTypeDef;
  className?: string;
};
const PropertyDetailsContent: React.FC<Props> = ({ property, className }) => {
  const [t] = useTranslation();

  return (
    <article className={cn("flex flex-col gap-2", className)}>
      <PropertyImageSlider
        className="h-[400px] select-none sm:h-[300px] xs:h-[300px]"
        images={property.photos}
      />
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-1">
          <PropertyListedDate
            createdAt={property.createdAt}
            updatedAt={property.updatedAt}
          />
          <div className="h-2 rounded-md border-l-[1px] border-solid border-foreground"></div>
          <PropertyViews views={property.views} />
        </div>
        <div className="flex flex-wrap gap-2">
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

        <PropertyUserAvatar user={property.user} />

        <Separator />

        <span className="text-sm">{t("contract-details")}</span>

        <PropertyContractDetailsBadges propertyData={property} />

        <span className="text-sm">{t("commodities")}</span>

        <PropertyCommoditiesBadges property={property} />

        {property.description && (
          <div className="flex flex-col">
            <span className="text-sm">{t("description")}</span>
            <p className="line-clamp-1 max-h-20 text-sm lg:line-clamp-3">
              {property.description}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

export default PropertyDetailsContent;
