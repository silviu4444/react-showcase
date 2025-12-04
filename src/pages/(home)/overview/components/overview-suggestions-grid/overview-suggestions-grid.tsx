import { PropertyListMock } from "@/pages/(search)/grid/mocks/property.mocks";
import OverviewSuggestionsGridItem from "../overview-suggestions-grid-item/overview-suggestions-grid-item";

const OverviewSuggestionsGrid = () => {
  return (
    <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {PropertyListMock.map((property) => (
        <OverviewSuggestionsGridItem key={property.id} property={property} />
      ))}
    </div>
  );
};

export default OverviewSuggestionsGrid;
