import QueryFiltersCtx from "@/shared/providers/query-filters-provider";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import MainSearch from "./components/main-search/main-search";
import useDefaultQueryFiltersParams from "./hooks/use-default-query-filters-params";
import SearchModalProvider from "./providers/search-modal-provider";

const SearchByMap = () => {
  const [t] = useTranslation();
  useDefaultQueryFiltersParams();

  return (
    <>
      <Helmet>
        <title>{`immobilis - ${t("search")}`}</title>
      </Helmet>
      <QueryFiltersCtx>
        <MainSearch />
        <SearchModalProvider />
      </QueryFiltersCtx>
    </>
  );
};

export default SearchByMap;
