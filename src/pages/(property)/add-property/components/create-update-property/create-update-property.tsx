import useGetPropertyById from "@/shared/hooks/use-get-property-by-id";
import Spinner from "@/shared/components/ui/spinner";
import AddPropertyStepper from "../add-property-stepper/add-property-stepper";

type CreateUpdatePropertyProps = { propertyId: string };

const CreateUpdateProperty: React.FC<CreateUpdatePropertyProps> = ({
  propertyId
}) => {
  const { isLoading, data: property } = useGetPropertyById({ propertyId });

  if (isLoading) {
    return <Spinner center />;
  }

  return <AddPropertyStepper editMode={!!propertyId} property={property} />;
};

export default CreateUpdateProperty;
