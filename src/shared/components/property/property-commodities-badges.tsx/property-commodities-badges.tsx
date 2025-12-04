import {
  COMMODITIES_TYPE_KEYS,
  PROPERTY_CONDITIONS_TYPE_KEYS,
  PROPERTY_FURNITURE_TYPES_KEYS
} from "@/shared/constants/property.constants";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { cn } from "@/shared/lib/utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { BiCloset } from "react-icons/bi";
import { CiCrop, CiParking1 } from "react-icons/ci";
import { FaShower } from "react-icons/fa";
import { LuArmchair } from "react-icons/lu";
import {
  MdBalcony,
  MdConstruction,
  MdMeetingRoom,
  MdOutlineDeck,
  MdOutlineElevator
} from "react-icons/md";
import { TbAirConditioning, TbStairsDown } from "react-icons/tb";
import { Badge } from "../../ui/badge";

type PropertyCommoditiesBadgesProps = {
  className?: string;
  property: PropertyTypeDef;
};

const PropertyCommoditiesBadges: React.FC<PropertyCommoditiesBadgesProps> = ({
  className,
  property
}) => {
  const [t] = useTranslation();

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Badge variant="outline">
        <MdMeetingRoom className="size-4" />
        {property.details.roomNumber}
      </Badge>

      <Badge variant="outline">
        <FaShower className="size-4" />
        {property.details.bathroomNumber}
      </Badge>

      {property.details.surface && (
        <Badge variant="outline">
          <CiCrop className="size-4" />
          {property.details.surface}
          <span className="font-semibold">㎡</span>
        </Badge>
      )}

      <Badge variant="outline">
        <MdConstruction className="size-4" />

        {t(PROPERTY_CONDITIONS_TYPE_KEYS[property.details.conditions])}
      </Badge>

      {property.details.hasElevator && (
        <Badge variant="outline">
          <MdOutlineElevator className="size-4" />
          {t("elevator")}
        </Badge>
      )}

      <Badge variant="outline">
        <LuArmchair className="size-4" />

        {t(PROPERTY_FURNITURE_TYPES_KEYS[property.details.furniture])}
      </Badge>

      {property.details.commodities.hasAirConditioning && (
        <Badge variant="outline">
          <TbAirConditioning className="size-4" />

          {t(COMMODITIES_TYPE_KEYS["air_conditioning"])}
        </Badge>
      )}

      {property.details.commodities.hasClosetInTheWall && (
        <Badge variant="outline">
          <BiCloset className="size-4" />

          {t(COMMODITIES_TYPE_KEYS["wardrobe_on_the_wall"])}
        </Badge>
      )}

      {property.details.commodities.hasBalcony && (
        <Badge variant="outline">
          <MdBalcony className="size-4" />
          {t(COMMODITIES_TYPE_KEYS["balcony"])}
        </Badge>
      )}

      {property.details.commodities.hasCellar && (
        <Badge variant="outline">
          <TbStairsDown className="size-4" />
          {t(COMMODITIES_TYPE_KEYS["cellar"])}
        </Badge>
      )}

      {property.details.commodities.hasParking && (
        <Badge variant="outline">
          <CiParking1 className="size-4" />
          {t(COMMODITIES_TYPE_KEYS["garage"])}
        </Badge>
      )}

      {property.details.commodities.hasTerrace && (
        <Badge variant="outline">
          <MdOutlineDeck className="size-4" />
          {t(COMMODITIES_TYPE_KEYS["terrace"])}
        </Badge>
      )}
    </div>
  );
};

export default PropertyCommoditiesBadges;
