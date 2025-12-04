import Container from "@/shared/components/ui/container";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import CreateUpdateProperty from "./components/create-update-property/create-update-property";

const AddProperty = () => {
  const [t] = useTranslation();
  const [params] = useSearchParams();
  const propertyId = params.get("pid");

  return (
    <Container>
      <Helmet>
        <title>{t(propertyId ? "update-property" : "add-property")}</title>
      </Helmet>
      <CreateUpdateProperty propertyId={propertyId || ""} />
    </Container>
  );
};

export default AddProperty;
