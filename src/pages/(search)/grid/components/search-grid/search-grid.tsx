import { PropertyListMock } from "../../mocks/property.mocks";
import SearchGridItem from "./search-grid-item/search-grid-item";

const SearchGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {PropertyListMock.map((property) => (
        <SearchGridItem key={property.id} property={property} />
      ))}
    </div>
  );
};

export default SearchGrid;
