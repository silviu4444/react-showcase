import { UseFormReturn } from "react-hook-form";
import { useQueryFilters } from "../../../../shared/providers/query-filters-provider";
import {
  addFiltersDefaultValues,
  AdvancedFiltersType
} from "../components/advanced-filters-modal/advanced-filters-modal-content";

const usePatchAddFormFromQueries = () => {
  const queryFilters = useQueryFilters(({ queryFilters }) => queryFilters);

  return (form: UseFormReturn<AdvancedFiltersType>) => {
    form.reset({
      ...addFiltersDefaultValues,
      city: {
        inputValue: queryFilters.city || "",
        lat: queryFilters.lat ? +queryFilters.lat : 0,
        lng: queryFilters.lng ? +queryFilters.lng : 0
      },
      air_conditioning:
        !!queryFilters.airC || addFiltersDefaultValues.air_conditioning,
      balcony: !!queryFilters.balcony || addFiltersDefaultValues.balcony,
      bathroomsNumber:
        queryFilters.bn || addFiltersDefaultValues.bathroomsNumber,
      cellar: !!queryFilters.cellar || addFiltersDefaultValues.cellar,
      propertyFurniture:
        queryFilters.pf || addFiltersDefaultValues.propertyFurniture,
      garage: !!queryFilters.garage || addFiltersDefaultValues.garage,
      hasElevator:
        !!queryFilters.hasElevator || addFiltersDefaultValues.hasElevator,
      propertyConditions:
        queryFilters.pc || addFiltersDefaultValues.propertyConditions,
      relationType: queryFilters.rt || addFiltersDefaultValues.relationType,
      petFriendly: !!queryFilters.petF || addFiltersDefaultValues.petFriendly,
      priceFrom: queryFilters.priceF || addFiltersDefaultValues.priceFrom,
      priceUpTo: queryFilters.priceT || addFiltersDefaultValues.priceUpTo,
      roomsNumber: queryFilters.rn || addFiltersDefaultValues.roomsNumber,
      surface: queryFilters.surface || addFiltersDefaultValues.surface,
      terrace: !!queryFilters.terrace || addFiltersDefaultValues.terrace,
      type: queryFilters.pt || addFiltersDefaultValues.type,
      wardrobe_on_the_wall:
        !!queryFilters.wotw || addFiltersDefaultValues.wardrobe_on_the_wall,
      withoutRentInAdvance:
        !!queryFilters.wria || addFiltersDefaultValues.withoutRentInAdvance
    });
  };
};

export default usePatchAddFormFromQueries;
