import QueryFiltersCtx from "@/shared/providers/query-filters-provider";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import useDefaultQueryFiltersParams from "../map/hooks/use-default-query-filters-params";
import SearchGridContainer from "./components/search-grid-container/search-grid-container";
import SearchByGridProvider from "./providers/search-by-grid-provider";

const SearchByGird = () => {
  const [t] = useTranslation();
  useDefaultQueryFiltersParams();

  return (
    <>
      <Helmet>
        <title>{`immobilis - ${t("search")}`}</title>
      </Helmet>
      <QueryFiltersCtx>
        <SearchByGridProvider />
        <SearchGridContainer />
      </QueryFiltersCtx>
    </>
  );
};

export default SearchByGird;
