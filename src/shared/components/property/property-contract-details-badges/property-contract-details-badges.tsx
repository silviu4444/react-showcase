import { MINIMUM_LEASE_TERM_TYPE_KEYS } from "@/shared/constants/property.constants";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { CiCalendar } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { Badge } from "../../ui/badge";

type PropertyContractDetailsBadgesProps = {
  propertyData: PropertyTypeDef;
};

const PropertyContractDetailsBadges: FC<PropertyContractDetailsBadgesProps> = ({
  propertyData
}) => {
  const [t] = useTranslation();

  const hasContractDetails =
    !!propertyData.contractDetails.maximumNumberOfTenants ||
    propertyData.contractDetails.minimumLeaseTerm.value;

  if (!hasContractDetails) {
    return "-";
  }

  return (
    <div className="flex h-fit flex-wrap gap-2">
      {propertyData.contractDetails.maximumNumberOfTenants && (
        <Badge className="flex items-center gap-1" variant="outline">
          <FaPeopleGroup className="size-[14px]" />
          {t(
            propertyData.contractDetails.maximumNumberOfTenants > 1
              ? "contract-details-maximum-number-of-tenants"
              : "contract-details-maximum-number-of-tenant",
            {
              maximumNumberOfTenants:
                propertyData.contractDetails.maximumNumberOfTenants
            }
          )}
        </Badge>
      )}

      {propertyData.contractDetails.minimumLeaseTerm.value && (
        <Badge className="flex items-center gap-1" variant="outline">
          <CiCalendar className="size-[14px]" />
          {t("minimum-lease-term")}:{" "}
          {propertyData.contractDetails.minimumLeaseTerm.value}{" "}
          {t(
            MINIMUM_LEASE_TERM_TYPE_KEYS[
              propertyData.contractDetails.minimumLeaseTerm.type
            ]
          ).toLowerCase()}
        </Badge>
      )}
    </div>
  );
};

export default PropertyContractDetailsBadges;
