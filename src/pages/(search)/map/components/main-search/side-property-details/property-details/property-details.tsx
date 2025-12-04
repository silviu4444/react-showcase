import useFormatPropertyTitle from "@/pages/(search)/map/hooks/use-format-property-title";
import useGetPropertyById from "@/shared/hooks/use-get-property-by-id";
import TryAgainButton from "@/shared/components/buttons/try-again-button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import Spinner from "@/shared/components/ui/spinner";
import { IoArrowBackOutline, IoLocationOutline } from "react-icons/io5";
import PropertyActions from "../../property-actions/property-actions";
import PropertyDetailsContent from "./property-details-content";
import { useQueryFilters } from "@/shared/providers/query-filters-provider";
import OpenPropertyInExternalLink from "@/shared/components/property/open-property-in-external-link/open-property-in-external-link";

type PropertyDetailsProps = {
  propertyId: string;
};

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ propertyId }) => {
  const { setQueries } = useQueryFilters();
  const { data, isLoading, isError, refetch } = useGetPropertyById({
    propertyId
  });
  const { formatPropertyTitle } = useFormatPropertyTitle();

  if (isLoading) {
    return <Spinner center />;
  }

  if (isError) {
    return <TryAgainButton center onRetry={refetch} />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <CardHeader>
        <IoArrowBackOutline
          className="relative -left-[3px] size-6 hover:opacity-70"
          onClick={() => setQueries({ filters: { pId: "" } })}
        />
        <div className="flex w-full items-center justify-between gap-4">
          <CardTitle className="inline-block truncate font-semibold">
            {formatPropertyTitle({ property: data })}
          </CardTitle>
          <OpenPropertyInExternalLink pId={data.id} />
        </div>
        <CardDescription className="flex items-center gap-1">
          <IoLocationOutline className="size-5" />
          <span className="truncate">{data.details.address.street}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="h-[calc(100dvh-345px)] overflow-y-auto">
        <PropertyDetailsContent property={data!} />
      </CardContent>

      <CardFooter>
        <div className="mt-2 w-full border-t py-2">
          <PropertyActions propertyData={data} withShareBtn />
        </div>
      </CardFooter>
    </>
  );
};

export default PropertyDetails;
