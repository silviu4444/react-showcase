import { useUserState } from "@/core/hooks/auth.state";
import AddToFavoriteButton from "@/shared/components/buttons/add-to-favorite-button";
import SharePropertyButton from "@/shared/components/property/share-property-button/share-property-button";
import { Button } from "@/shared/components/ui/button";
import { CONTACT_TYPE } from "@/shared/constants/property.constants";
import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { cn } from "@/shared/lib/utils";
import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { AiFillMessage } from "react-icons/ai";
import { IoCall } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type PropertyActionsProps = {
  propertyData: PropertyTypeDef;
  withoutFavoriteButton?: boolean;
  withShareBtn?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const PropertyActions: React.FC<PropertyActionsProps> = ({
  propertyData,
  withShareBtn,
  withoutFavoriteButton,
  className,
  ...props
}) => {
  const user = useUserState();
  const [t] = useTranslation();
  const navigate = useNavigate();
  const contactType = propertyData.contactPreference;
  const canMessageProperty = propertyData.user.id !== user?.id;

  const onPrivateMessage = () => {
    if (user?.id && canMessageProperty) {
      const url = `/messages/${propertyData.id}/${propertyData.user.id}`;
      navigate(url);
    }
  };

  return (
    <div className={cn("flex w-full items-center gap-2", className)} {...props}>
      {(contactType === CONTACT_TYPE.JUST_PHONE ||
        contactType === CONTACT_TYPE.ALL) && (
        <>
          <Button className="flex w-full items-center gap-1" variant="outline">
            <IoCall />
            {t("call")}
          </Button>
          <span className="h-4 border-l-[2px]"></span>
        </>
      )}

      {(contactType === CONTACT_TYPE.JUST_CHAT ||
        contactType === CONTACT_TYPE.ALL) && (
        <Button
          className="flex w-full items-center gap-1"
          variant="outline"
          onClick={onPrivateMessage}
        >
          <AiFillMessage />
          {t("message")}
        </Button>
      )}

      {!withoutFavoriteButton && (
        <>
          <span className="h-4 border-l-[2px]"></span>
          <AddToFavoriteButton
            propertyId={propertyData.id}
            isFavorite={propertyData.isFavorite}
            ownerId={propertyData.user.id}
          />
        </>
      )}

      {withShareBtn && (
        <>
          <span className="h-4 border-l-[2px]"></span>
          <SharePropertyButton propertyId={propertyData.id} />
        </>
      )}
    </div>
  );
};

export default PropertyActions;
