import { PROPERTY_TYPE } from "@/shared/constants/property.constants";
import { PropertyPreviewDef } from "@/shared/interfaces/property/property.interfaces";
import { cn } from "@/shared/lib/utils";
import { HTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import PreviewPropertyGridItem from "./preview-property-grid-item";

type PreviewPropertyGridProps = {
  properties: PropertyPreviewDef[] | undefined;
  propertyType: PROPERTY_TYPE;
  onItemClicked: (id: string) => void;
} & HTMLAttributes<HTMLDivElement>;

const PreviewPropertyGrid: React.FC<PreviewPropertyGridProps> = ({
  properties,
  onItemClicked,
  propertyType,
  className,
  ...props
}) => {
  const [t] = useTranslation();

  if (!properties || !properties.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-center text-lg font-semibold">
          {t("no-properties-found")}
        </p>
        <span className="text-center">
          {t("try-changing-your-search-criteria")}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {properties.map((property) => (
        <PreviewPropertyGridItem
          key={property.id}
          property={property}
          onClick={onItemClicked}
          propertyType={propertyType}
        />
      ))}
    </div>
  );
};

export default PreviewPropertyGrid;
