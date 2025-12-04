import useFormatPropertyTitle from "@/pages/(search)/map/hooks/use-format-property-title";
import useGetPropertyById from "@/shared/hooks/use-get-property-by-id";
import TryAgainButton from "@/shared/components/buttons/try-again-button";
import { DrawerFooter } from "@/shared/components/ui/drawer";
import DrawerModalContentContainer from "@/shared/components/ui/drawer-modal/drawer-modal-content-container";
import Spinner from "@/shared/components/ui/spinner";
import { useQueryFilters } from "@/shared/providers/query-filters-provider";
import { useEffect } from "react";
import PropertyActions from "../property-actions/property-actions";
import PropertyDetailsContent from "../side-property-details/property-details/property-details-content";

type PropertyDetailsModalContentProps = {
  onTitleLoaded: (title: string) => void;
};

const PropertyDetailsModalContent: React.FC<
  PropertyDetailsModalContentProps
> = ({ onTitleLoaded }) => {
  const propertyId = useQueryFilters(({ queryFilters }) => queryFilters.pId);
  const {
    isLoading,
    isError,
    data: property,
    refetch
  } = useGetPropertyById({ propertyId });
  const { formatPropertyTitle } = useFormatPropertyTitle();

  useEffect(() => {
    property && onTitleLoaded(formatPropertyTitle({ property }));

    return () => onTitleLoaded("");
  }, [property]);

  return (
    <>
      <DrawerModalContentContainer hasFooter>
        {isLoading && <Spinner center />}
        {isError && <TryAgainButton onRetry={refetch} />}
        {!isLoading && !isError && property && (
          <div className="h-full overflow-y-auto">
            <PropertyDetailsContent className="mb-4" property={property} />
          </div>
        )}
      </DrawerModalContentContainer>
      <DrawerFooter className="min-h-9">
        {property && <PropertyActions propertyData={property} withShareBtn />}
      </DrawerFooter>
    </>
  );
};

export default PropertyDetailsModalContent;
