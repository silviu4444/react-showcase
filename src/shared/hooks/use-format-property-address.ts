import { useTranslation } from "react-i18next";
import { PropertyTypeDef } from "../interfaces/property/property.interfaces";

const useFormatPropertyAddress = () => {
  const [t] = useTranslation();

  return (property: PropertyTypeDef) => {
    const streetNumber = property.details.address.streetNumber
      ? `, ${t("nr")} ${property.details.address.streetNumber}`
      : "";
    const residenceComplex = property.details.address.residenceComplex
      ? ` (${property.details.address.residenceComplex})`
      : "";
    return `${property.details.address.street}${streetNumber}, ${property.details.address.city} ${residenceComplex}`;
  };
};

export default useFormatPropertyAddress;
