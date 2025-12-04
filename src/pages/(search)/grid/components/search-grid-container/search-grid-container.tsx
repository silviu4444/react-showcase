import MainSearchFilters from "@/pages/(search)/map/components/main-search/main-search-filters/main-search-filters";
import Container from "@/shared/components/ui/container";
import useSearchGridScrollRestore from "../../hooks/use-search-grid-scroll-restore";
import SearchGridPagination from "../search-grid-pagination/search-grid-pagination";
import SearchGrid from "../search-grid/search-grid";

const SearchGridContainer = () => {
  const { ref } = useSearchGridScrollRestore();

  return (
    <Container className="flex flex-col gap-4 overflow-y-auto" ref={ref}>
      <MainSearchFilters />
      <SearchGrid />
      <SearchGridPagination />
    </Container>
  );
};

export default SearchGridContainer;
