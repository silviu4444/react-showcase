import {
  deviceMatcherMap,
  useMediaQuery
} from "@/shared/hooks/use-media-query";
import { useQueryFilters } from "../../../../shared/providers/query-filters-provider";
import { usePropertyDetailsByIdModal } from "./use-property-details-by-id-modal";
import { usePropertyDetailsModal } from "./use-property-details-modal";

const useMainSearchUtils = () => {
  const { onOpen } = usePropertyDetailsModal();
  const { onOpen: openById } = usePropertyDetailsByIdModal();
  const setQueries = useQueryFilters(({ setQueries }) => setQueries);
  const isPhone = useMediaQuery(deviceMatcherMap.bp640);

  function onViewPropertiesMobile() {
    onOpen();
  }

  const onViewPropertiesById = (ids: string[]) => {
    if (ids.length === 1) {
      setQueries({ filters: { pId: ids[0] } });
      isPhone && openById();
    }
  };
  return {
    onViewPropertiesMobile,
    onViewPropertiesById
  };
};

export default useMainSearchUtils;
