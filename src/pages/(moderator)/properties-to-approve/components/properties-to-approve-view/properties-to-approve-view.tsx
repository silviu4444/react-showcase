import Spinner from "@/shared/components/ui/spinner";
import useGetPropertiesToApproveQuery from "../../hooks/use-get-properties-to-approve-query";
import TryAgainButton from "@/shared/components/buttons/try-again-button";
import PropertyToApproveItem from "../property-to-approve-item/property-to-approve-item";

const PropertiesToApproveView = () => {
  const { data, isPending, isError, refetch } =
    useGetPropertiesToApproveQuery();

  if (isPending) {
    return <Spinner center />;
  }

  if (isError) {
    return <TryAgainButton onRetry={refetch} />;
  }

  if (!data.length) {
    return (
      <div className="flex h-[70dvh] flex-col items-center justify-center gap-2">
        <p className="flex items-center gap-1 text-center">
          No properties to approve/deny at this time
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.map((property) => (
        <PropertyToApproveItem data={property} />
      ))}
    </div>
  );
};

export default PropertiesToApproveView;
