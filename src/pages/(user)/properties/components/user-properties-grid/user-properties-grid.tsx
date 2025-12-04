import AddPropertyButton from "@/shared/components/buttons/add-property-button";
import TryAgainButton from "@/shared/components/buttons/try-again-button";
import Spinner from "@/shared/components/ui/spinner";
import { useTranslation } from "react-i18next";
import useUserProperties from "../../hooks/use-user-properties";
import UserPropertiesGridItem from "./user-properties-grid-item";

const UserPropertiesGrid = () => {
  const [t] = useTranslation();
  const { data, isLoading, isError, refetch } = useUserProperties();

  if (isLoading) {
    return <Spinner center />;
  }

  if (isError) {
    return <TryAgainButton center onRetry={() => refetch()} />;
  }

  if (data?.length === 0) {
    return (
      <div className="flex h-[70dvh] flex-col items-center justify-center gap-2">
        <p className="flex items-center gap-1 text-center">
          {t("you-have-not-added-any-properties-yet")}
        </p>
        <AddPropertyButton className="w-fit" variant="default" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((property) => (
        <UserPropertiesGridItem key={property.id} property={property} />
      ))}
    </div>
  );
};

export default UserPropertiesGrid;
