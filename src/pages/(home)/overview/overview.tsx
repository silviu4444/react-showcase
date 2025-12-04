import Container from "@/shared/components/ui/container";
import QueryFiltersCtx from "@/shared/providers/query-filters-provider";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import OverviewSuggestionsGrid from "./components/overview-suggestions-grid/overview-suggestions-grid";
import SelectFiltering from "./components/select-filtering/select-filtering";

const OverviewPage = () => {
  const [t] = useTranslation();
  return (
    <>
      <Helmet>
        <title>{`immobilis - ${t("home")}`}</title>
      </Helmet>

      <QueryFiltersCtx>
        <Container className="flex flex-col gap-4">
          <SelectFiltering />
          <h1 className="pb-4 pt-14 text-center text-2xl font-semibold md:text-start">
            {t("promoted-ads")}
          </h1>
          <OverviewSuggestionsGrid />
        </Container>
      </QueryFiltersCtx>
    </>
  );
};

export default OverviewPage;
