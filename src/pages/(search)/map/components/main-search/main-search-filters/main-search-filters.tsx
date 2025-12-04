import {
  MAIN_SEARCH_PROPERTY_TYPE_OPTIONS,
  MAIN_SEARCH_PROPERTY_TYPES
} from "@/pages/(search)/map/constants/main-search.constants";
import { useAdvancedFiltersModal } from "@/pages/(search)/map/hooks/use-advanced-filters-modal";
import AddressAutocomplete from "@/shared/components/form/address-autocomplete/address-autocomplete";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shared/components/ui/tooltip";
import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import {
  deviceMatcherMap,
  useMediaQuery
} from "@/shared/hooks/use-media-query";
import { AddressAutocompleteValueDef } from "@/shared/interfaces/forms/address-autocomplete.interfaces";
import { useTranslation } from "react-i18next";
import { FaFilter } from "react-icons/fa";
import { useQueryFilters } from "../../../../../../shared/providers/query-filters-provider";
import MainSearchQuickFilters from "./main-search-quick-filters";
const MainSearchFilters = () => {
  const [t] = useTranslation();
  const { onOpen } = useAdvancedFiltersModal();
  const isDesktop = useMediaQuery(deviceMatcherMap.min1024);
  const { basicFilters, setQueries, queryFilters, latLng } = useQueryFilters();

  const cityAddress: AddressAutocompleteValueDef = {
    inputValue: queryFilters.city || "",
    ...latLng
  };

  function onCityChanged({
    city,
    lat,
    lng
  }: AddressAutocompleteValueDef): void {
    if (city && lat) {
      setQueries({
        filters: {
          city,
          lat: lat.toString(),
          lng: lng.toString()
        }
      });
    }
  }

  return (
    <div className="flex gap-2">
      {isDesktop && (
        <div className="flex gap-2">
          <Select
            value={basicFilters.propertyType}
            onValueChange={(pt: PROPERTY_TYPE) =>
              setQueries({ filters: { pt } })
            }
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder={t("property-type")} />
            </SelectTrigger>
            <SelectContent>
              {MAIN_SEARCH_PROPERTY_TYPES.map(({ type, labelKey }) => (
                <SelectItem key={type} value={type}>
                  {t(labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={basicFilters.relationType}
            onValueChange={(relationType) =>
              setQueries({
                filters: {
                  rt: relationType as RELATION_TYPE
                }
              })
            }
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder={t("property-type")} />
            </SelectTrigger>
            <SelectContent>
              {MAIN_SEARCH_PROPERTY_TYPE_OPTIONS.map(({ value, labelKey }) => (
                <SelectItem key={value} value={value}>
                  {t(labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <AddressAutocomplete
            className="w-full lg:w-fit"
            placeholderKey="city"
            type="(cities)"
            defaultValue={cityAddress}
            onChange={onCityChanged}
          />
        </div>
      )}
      <div className="flex h-[46px] snap-x snap-mandatory gap-2 overflow-x-auto lg:snap-none">
        <MainSearchQuickFilters isDesktop={isDesktop} />
      </div>
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger className="h-9">
            <Button
              className="ml-auto lg:ml-0"
              type="button"
              variant="outline"
              size="icon"
              onClick={() => onOpen()}
            >
              <FaFilter />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{t("filters")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MainSearchFilters;
