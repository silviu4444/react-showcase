import { environment } from "@/environment";
import { defaultLocalizationCoordinates } from "@/shared/constants/localization.constants";
import useGeoLocation from "@/shared/hooks/use-geolocation";
import useUIState from "@/shared/state/use-ui-state";
import {
  Map as GoogleMap,
  MapProps as GoogleMapProps
} from "@vis.gl/react-google-maps";
import { ElementRef, useEffect, useRef, useState } from "react";
import DrawingControllers from "./drawing-controllers";
import useFreehandShapeDrawer from "./use-freehand-shape-drawer";

type Polyline = google.maps.Polyline;

type MapProps = {
  width?: string | number;
  height?: string | number;
  freeHandShapeEnabled?: boolean;
  children?: React.ReactNode;
  onShapeChanged?: (polyline: Polyline | null) => void;
  onSelectionClear?: () => void;
  onDrawingStarted?: (active: boolean) => void;
} & GoogleMapProps;

const Map = (props: MapProps) => {
  const {
    width = "100%",
    height = "100vh",
    onShapeChanged,
    onSelectionClear,
    onDrawingStarted,
    fullscreenControl = false,
    mapTypeControl = false,
    streetViewControl = false,
    freeHandShapeEnabled = false,
    children = null,
    defaultCenter,
    center,
    ...otherProps
  } = props;
  const { currentLocation, pending } = useGeoLocation();

  const mapContainerRef = useRef<ElementRef<"div"> | null>(null);
  const theme = useUIState(({ state }) => state.themeMode);
  const [_center, _setCenter] = useState(center);

  const {
    cancelDrawing,
    clearSelection,
    drawingStarted,
    hasSelection,
    startDrawing
  } = useFreehandShapeDrawer({
    onShapeChanged,
    mapContainerRef,
    isEnabled: freeHandShapeEnabled
  });

  const _onSelectionClear = () => {
    onSelectionClear?.();
    clearSelection();
  };

  useEffect(() => {
    _setCenter(() => {
      if (!center?.lat) {
        return null;
      }
      return center;
    });

    setTimeout(() => _setCenter(null), 100);
  }, [center]);

  useEffect(() => {
    onDrawingStarted?.(drawingStarted);
  }, [drawingStarted]);

  return (
    <div className="relative">
      <DrawingControllers
        cancelDrawing={cancelDrawing}
        drawingStarted={drawingStarted}
        enabled={freeHandShapeEnabled}
        hasSelection={hasSelection}
        onSelectionClear={_onSelectionClear}
        startDrawing={startDrawing}
      />
      <div style={{ width, height }} ref={mapContainerRef}>
        <GoogleMap
          mapId={
            theme === "light"
              ? environment.lightThemeMapId
              : environment.darkThemeMapId
          }
          key={pending ? "map-pending" : "map-ready"}
          defaultCenter={{
            ...(defaultCenter?.lat !== 0
              ? (defaultCenter as google.maps.LatLngLiteral)
              : currentLocation ||
                defaultLocalizationCoordinates[environment.localization])
          }}
          center={_center}
          fullscreenControl={fullscreenControl}
          mapTypeControl={mapTypeControl}
          streetViewControl={streetViewControl}
          defaultZoom={12}
          {...otherProps}
        >
          {children}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
