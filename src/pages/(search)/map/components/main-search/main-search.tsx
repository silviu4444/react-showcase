import { Card } from "@/shared/components/ui/card";
import Container from "@/shared/components/ui/container";
import Spinner from "@/shared/components/ui/spinner";
import {
  deviceMatcherMap,
  useMediaQuery
} from "@/shared/hooks/use-media-query";
import { lazy, Suspense } from "react";
import useMainSearchUtils from "../../hooks/use-main-search-utils";
import MainSearchFilters from "./main-search-filters/main-search-filters";
import MainSearchMap from "./main-search-map/main-search-map";
import ErrorBoundary from "@/shared/components/error-boundary/error-boundary";
const SidePropertyDetails = lazy(
  () => import("./side-property-details/side-property-details")
);

const MainSearch = () => {
  const { onViewPropertiesById, onViewPropertiesMobile } = useMainSearchUtils();
  const isNotPhone = useMediaQuery(deviceMatcherMap.min640);

  return (
    <div className="flex h-full flex-col">
      <Container className="pb-1.5">
        <MainSearchFilters />
      </Container>

      <div className="flex h-full-safe w-full gap-4">
        <ErrorBoundary>
          <MainSearchMap
            onViewPropertiesMobile={onViewPropertiesMobile}
            onTagClicked={onViewPropertiesById}
          />
        </ErrorBoundary>
        {isNotPhone && (
          <Card className="relative mr-4 h-[calc(100%-16px)] w-[500px] min-w-[500px]">
            <Suspense fallback={<Spinner center />}>
              <ErrorBoundary>
                <SidePropertyDetails />
              </ErrorBoundary>
            </Suspense>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MainSearch;
