import { IoSearchOutline } from "react-icons/io5";

import {
  MAIN_SEARCH_PROPERTY_TYPE_OPTIONS,
  MAIN_SEARCH_PROPERTY_TYPES
} from "@/pages/(search)/map/constants/main-search.constants";
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
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import { RouterPages } from "@/shared/constants/router.constants";
import { useQueryFilters } from "@/shared/providers/query-filters-provider";
import { AddressAutocompleteValueDef } from "@/shared/schemas/address-autocomplete.schema";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectSearchMode, {
  SearchModeType
} from "../select-search-mode/select-search-mode";

const SelectFiltering = () => {
  const [t] = useTranslation();
  const { basicFilters, queryFilters, setQueries, latLng } = useQueryFilters();
  const [searchMode, setSearchMode] = useState<SearchModeType>("map");
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const cityAddress: AddressAutocompleteValueDef = {
    inputValue: queryFilters?.city || "",
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

  const onNavigateToSearch = () => {
    const queryParams = params.toString();
    const baseUrl =
      searchMode === "map" ? RouterPages.SearchByMap : RouterPages.SearchByGrid;
    navigate(`${baseUrl}/?${queryParams}`);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="flex gap-2">
        <Select
          value={basicFilters.propertyType}
          onValueChange={(pt: PROPERTY_TYPE) => setQueries({ filters: { pt } })}
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
          <SelectTrigger>
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
      </div>
      <div className="flex items-center gap-2">
        <AddressAutocomplete
          className="w-full lg:w-fit"
          placeholderKey="city"
          type="(cities)"
          defaultValue={cityAddress}
          onChange={onCityChanged}
        />
        <SelectSearchMode mode={searchMode} onModeChanged={setSearchMode} />
        <Button className="min-w-9" onClick={onNavigateToSearch} size="icon">
          <IoSearchOutline className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default SelectFiltering;
