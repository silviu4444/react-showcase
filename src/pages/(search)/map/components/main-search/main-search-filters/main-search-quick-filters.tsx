import QuickChip from "@/shared/components/ui/quick-chip";
import {
  PROPERTY_FURNITURE_TYPES_KEYS,
  PROPERTY_CONDITIONS_TYPE_KEYS,
  COMMODITIES_TYPE_KEYS,
  PROPERTY_TYPE
} from "@/shared/constants/property.constants";
import { useQueryFilters } from "@/shared/providers/query-filters-provider";
import { CiCrop, CiParking1 } from "react-icons/ci";
import { LuArmchair } from "react-icons/lu";
import {
  MdApartment,
  MdBalcony,
  MdConstruction,
  MdEuroSymbol,
  MdMeetingRoom,
  MdOutlineDeck,
  MdOutlineElevator,
  MdOutlinePets
} from "react-icons/md";
import {
  TbAirConditioning,
  TbCurrencyEuroOff,
  TbStairsDown
} from "react-icons/tb";

import { MAIN_SEARCH_PROPERTY_KEYS } from "@/pages/(search)/map/constants/main-search.constants";
import { useAdvancedFiltersModal } from "@/pages/(search)/map/hooks/use-advanced-filters-modal";
import { QueryFiltersParamsKeys } from "@/shared/interfaces/property/property.interfaces";
import { useTranslation } from "react-i18next";
import { BiCloset } from "react-icons/bi";
import { FaShower } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";

function WithSeparator({ children }: { children: React.ReactNode }) {
  return <div className="border-r pr-1">{children}</div>;
}

type MainSearchQuickFiltersProps = {
  isDesktop: boolean;
};

const MainSearchQuickFilters: React.FC<MainSearchQuickFiltersProps> = ({
  isDesktop
}) => {
  const [t] = useTranslation();
  const { queryFilters, setQueries } = useQueryFilters();
  const { onOpen } = useAdvancedFiltersModal();

  const typeHouse = queryFilters?.pt === PROPERTY_TYPE.HOUSE;
  function onRemoveFilter(key: QueryFiltersParamsKeys): void {
    setQueries({ filters: { ...queryFilters, [key]: null } });
  }

  function openFiltersModalInView(focusFieldKey: QueryFiltersParamsKeys): void {
    onOpen({ focusFieldKey });
  }

  return (
    <>
      {!isDesktop && (
        <>
          <QuickChip
            className="snap-center"
            variant="outline"
            onClick={() => openFiltersModalInView("pt")}
          >
            {
              <WithSeparator>
                {typeHouse ? (
                  <FaHouse className="size-4" />
                ) : (
                  <MdApartment className="size-4" />
                )}
              </WithSeparator>
            }
            {queryFilters?.pt ? t(`${queryFilters.pt}s`.toLowerCase()) : ""}
            {" - "}
            {queryFilters.rt
              ? t(MAIN_SEARCH_PROPERTY_KEYS[queryFilters.rt]).toLowerCase()
              : ""}
          </QuickChip>

          {queryFilters.city && (
            <QuickChip
              className="snap-center"
              variant="outline"
              onClick={() => openFiltersModalInView("city")}
            >
              <WithSeparator>
                <IoLocationOutline className="size-4" />
              </WithSeparator>
              {queryFilters.city}
            </QuickChip>
          )}
        </>
      )}

      {queryFilters.priceF && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("priceF")}
          onClick={() => openFiltersModalInView("priceF")}
        >
          <WithSeparator>
            <MdEuroSymbol className="size-4" />
          </WithSeparator>
          {t("price-from")} {queryFilters.priceF}
        </QuickChip>
      )}

      {queryFilters.priceT && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("priceT")}
          onClick={() => openFiltersModalInView("priceT")}
        >
          <WithSeparator>
            <MdEuroSymbol className="size-4" />
          </WithSeparator>
          {t("price-up-to")} {queryFilters.priceT}
        </QuickChip>
      )}

      {queryFilters.surface && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("surface")}
          onClick={() => openFiltersModalInView("surface")}
        >
          <WithSeparator>
            <CiCrop className="size-4 text-foreground" />
          </WithSeparator>
          {queryFilters.surface}
          <span className="font-semibold">㎡</span>
        </QuickChip>
      )}

      {queryFilters.wria && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("wria")}
          onClick={() => openFiltersModalInView("wria")}
        >
          <WithSeparator>
            <TbCurrencyEuroOff className="size-4" />
          </WithSeparator>
          0
        </QuickChip>
      )}

      {queryFilters.pc && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("pc")}
          onClick={() => openFiltersModalInView("pc")}
        >
          <WithSeparator>
            <MdConstruction className="size-4" />
          </WithSeparator>
          {t(PROPERTY_CONDITIONS_TYPE_KEYS[queryFilters.pc])}
        </QuickChip>
      )}

      {queryFilters.rn && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("rn")}
          onClick={() => openFiltersModalInView("rn")}
        >
          <WithSeparator>
            <MdMeetingRoom className="size-4" />
          </WithSeparator>
          {queryFilters.rn}
        </QuickChip>
      )}

      {queryFilters.bn && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("bn")}
          onClick={() => openFiltersModalInView("bn")}
        >
          <WithSeparator>
            <FaShower className="size-4" />
          </WithSeparator>
          {queryFilters.bn}
        </QuickChip>
      )}

      {queryFilters.hasElevator && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("hasElevator")}
          onClick={() => openFiltersModalInView("hasElevator")}
        >
          <WithSeparator>
            <MdOutlineElevator className="size-4" />
          </WithSeparator>
          {t("elevator")}
        </QuickChip>
      )}

      {queryFilters.pf && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("pf")}
          onClick={() => openFiltersModalInView("pf")}
        >
          <WithSeparator>
            <LuArmchair className="size-4" />
          </WithSeparator>
          {t(PROPERTY_FURNITURE_TYPES_KEYS[queryFilters.pf])}
        </QuickChip>
      )}

      {queryFilters.airC && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("airC")}
          onClick={() => openFiltersModalInView("airC")}
        >
          <WithSeparator>
            <TbAirConditioning className="size-4" />
          </WithSeparator>
          {t(COMMODITIES_TYPE_KEYS["air_conditioning"])}
        </QuickChip>
      )}

      {queryFilters.wotw && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("wotw")}
          onClick={() => openFiltersModalInView("wotw")}
        >
          <WithSeparator>
            <BiCloset className="size-4" />
          </WithSeparator>
          {t(COMMODITIES_TYPE_KEYS["wardrobe_on_the_wall"])}
        </QuickChip>
      )}

      {queryFilters.balcony && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("balcony")}
          onClick={() => openFiltersModalInView("balcony")}
        >
          <WithSeparator>
            <MdBalcony className="size-4" />
          </WithSeparator>
          {t(COMMODITIES_TYPE_KEYS["wardrobe_on_the_wall"])}
        </QuickChip>
      )}

      {queryFilters.cellar && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("cellar")}
          onClick={() => openFiltersModalInView("cellar")}
        >
          <WithSeparator>
            <TbStairsDown className="size-4" />
          </WithSeparator>
          {t(COMMODITIES_TYPE_KEYS["cellar"])}
        </QuickChip>
      )}

      {queryFilters.garage && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("garage")}
          onClick={() => openFiltersModalInView("garage")}
        >
          <WithSeparator>
            <CiParking1 className="size-4" />
          </WithSeparator>
          {t(COMMODITIES_TYPE_KEYS["garage"])}
        </QuickChip>
      )}

      {queryFilters.terrace && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("terrace")}
          onClick={() => openFiltersModalInView("terrace")}
        >
          <WithSeparator>
            <MdOutlineDeck className="size-4" />
          </WithSeparator>
          {t(COMMODITIES_TYPE_KEYS["terrace"])}
        </QuickChip>
      )}

      {queryFilters.petF && (
        <QuickChip
          className="snap-center"
          withRemoveButton
          variant="outline"
          onRemove={() => onRemoveFilter("petF")}
          onClick={() => openFiltersModalInView("petF")}
        >
          <WithSeparator>
            <MdOutlinePets className="size-4" />
          </WithSeparator>
          {t("pet-friendly")}
        </QuickChip>
      )}
    </>
  );
};

export default MainSearchQuickFilters;
