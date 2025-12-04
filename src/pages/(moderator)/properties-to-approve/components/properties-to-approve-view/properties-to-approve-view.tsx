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

  return (
    <div className="flex flex-col gap-4">
      {data.map((property) => (
        <PropertyToApproveItem data={property} />
      ))}
    </div>
  );
};

export default PropertiesToApproveView;
