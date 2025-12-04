import TryAgainButton from "@/shared/components/buttons/try-again-button";
import Spinner from "@/shared/components/ui/spinner";
import useGetPropertyById from "@/shared/hooks/use-get-property-by-id";
import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import PropertyByIdView from "./components/property-by-id-view/property-by-id-view";

const NotFoundView = lazy(
  () => import("./components/property-not-found-view/property-not-found-view")
);

const PropertyById = () => {
  const { id } = useParams();

  const { isPending, isError, error, data, refetch } = useGetPropertyById({
    propertyId: id
  });

  if (isPending) {
    return <Spinner center />;
  }

  if (error?.response?.status === 404) {
    return (
      <Suspense fallback={<Spinner center />}>
        <NotFoundView />
      </Suspense>
    );
  }

  if (isError) {
    return <TryAgainButton onRetry={refetch} />;
  }

  return <PropertyByIdView property={data} />;
};

export default PropertyById;
