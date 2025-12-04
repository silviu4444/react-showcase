import ErrorBoundary from "@/shared/components/error-boundary/error-boundary";
import Container from "@/shared/components/ui/container";
import UserPropertiesGrid from "./components/user-properties-grid/user-properties-grid";
import { useTranslation } from "react-i18next";

const UserProperties = () => {
  const [t] = useTranslation();

  return (
    <Container className="h-full">
      <h1 className="my-2 text-lg">{t("your-properties")}</h1>
      <ErrorBoundary>
        <UserPropertiesGrid />
      </ErrorBoundary>
    </Container>
  );
};

export default UserProperties;
