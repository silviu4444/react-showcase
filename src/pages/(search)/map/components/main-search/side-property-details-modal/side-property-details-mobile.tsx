import useFormatPropertyTitle from "@/pages/(search)/map/hooks/use-format-property-title";
import useGetPropertyById from "@/shared/hooks/use-get-property-by-id";
import TryAgainButton from "@/shared/components/buttons/try-again-button";
import Spinner from "@/shared/components/ui/spinner";
import { useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import PropertyDetailsContent from "../side-property-details/property-details/property-details-content";

type Props = {
  propertyId: string;
  onBack: () => void;
  onTitleReady: (title: string) => void;
};

const SidePropertyDetailsMobile: React.FC<Props> = ({
  propertyId,
  onBack,
  onTitleReady
}) => {
  const { formatPropertyTitle } = useFormatPropertyTitle();
  const { data, isLoading, isError, refetch } = useGetPropertyById({
    propertyId
  });

  useEffect(() => {
    data && onTitleReady(formatPropertyTitle({ property: data }));
  }, [data]);

  const closeIcon = (
    <IoArrowBackOutline
      className="absolute -top-11 left-5 size-6 hover:opacity-70"
      onClick={onBack}
    />
  );

  if (isLoading) {
    return (
      <div className="h-full">
        {closeIcon}
        <Spinner center />
      </div>
    );
  }

  if (isError) {
    <div className="h-full">
      {closeIcon}
      <TryAgainButton onRetry={refetch} />
    </div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="h-full overflow-y-auto">
        {closeIcon}
        <PropertyDetailsContent property={data!} />
      </div>
    </div>
  );
};

export default SidePropertyDetailsMobile;
