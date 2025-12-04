import useSearchMarkers from "@/pages/(search)/map/hooks/use-map-markers-query";
import CustomPropertyMaker from "@/shared/components/map/custom-property-marker/custom-property-marker";
import Map from "@/shared/components/map/map";
import { Button } from "@/shared/components/ui/button";
import {
  deviceMatcherMap,
  useMediaQuery
} from "@/shared/hooks/use-media-query";
import { cn } from "@/shared/lib/utils";
import GoogleMapsApiLoader from "@/shared/providers/google-map.provider";
import { useQueryFilters } from "@/shared/providers/query-filters-provider";
import { debounceFn } from "@/shared/utils/debounce.utils";
import { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowUp } from "react-icons/io";
import { useMapCoordinatesStore } from "../../../hooks/use-map-coordinates-store";

export type MainSearchMapProps = {
  onViewPropertiesMobile: () => void;
  onTagClicked?: (ids: string[]) => void;
};

const MainSearchMap: React.FC<MainSearchMapProps> = ({
  onViewPropertiesMobile,
  onTagClicked
}) => {
  const isPhone = useMediaQuery(deviceMatcherMap.bp640);
  const [t] = useTranslation();
  const { update, bounds } = useMapCoordinatesStore();

  const { markers, isFetchingMarkers, onDrawingStarted } = useSearchMarkers();
  const { queryFilters, latLng, setQueries } = useQueryFilters();

  const _onShapeChanged = (polyline: google.maps.Polyline | null) => {
    update({ polyline });
  };
  const zoom = queryFilters.zoom ? +queryFilters.zoom : 12;

  function onBoundsChanged(event: MapCameraChangedEvent) {
    const center = event.map.getCenter();
    setQueries({
      filters: {
        lat: center?.lat().toString(),
        lng: center?.lng().toString(),
        zoom: event.map.getZoom()?.toString()
      }
    });
    update({
      bounds: event.map.getBounds()!
    });
  }

  const mapHeight = window.innerHeight - 125;

  return (
    <div className="relative w-full flex-grow">
      <GoogleMapsApiLoader libraries={["drawing", "marker"]}>
        <Map
          height={mapHeight}
          defaultCenter={latLng}
          center={latLng}
          freeHandShapeEnabled
          defaultZoom={zoom}
          onShapeChanged={_onShapeChanged}
          onBoundsChanged={debounceFn(onBoundsChanged, 200)}
          onDrawingStarted={onDrawingStarted}
        >
          {markers?.map((pin) => (
            <CustomPropertyMaker
              key={pin.latitude + pin.longitude}
              meta={{ bounds: bounds!, zoom }}
              pin={pin}
              onTagClicked={(ids) => onTagClicked?.(ids)}
            />
          ))}
        </Map>
      </GoogleMapsApiLoader>

      {isPhone && markers && markers.length > 0 && (
        <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 gap-2">
          <Button
            className={cn(
              "flex items-center gap-1",
              isFetchingMarkers && "pointer-events-none animate-pulse"
            )}
            onClick={onViewPropertiesMobile}
          >
            {t("view-properties")}
            <IoIosArrowUp />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MainSearchMap;
