import useScrollUtility from "@/shared/hooks/use-scroll-utility";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { MutableRefObject, useEffect, useRef, useState } from "react";

type Polyline = google.maps.Polyline;

type useFreehandShapeDrawerProps = {
  isEnabled?: boolean;
  mapContainerRef: MutableRefObject<HTMLDivElement | null>;
  onShapeChanged?: (polygon: Polyline | null) => void;
};

const useFreehandShapeDrawer = ({
  isEnabled,
  mapContainerRef,
  onShapeChanged
}: useFreehandShapeDrawerProps) => {
  const coreLibrary = useMapsLibrary("core");
  const mapInstance = useMap();
  const isMouseDownRef = useRef<boolean>(false);
  const { enableOverscrollNone, disableOverscrollNone } = useScrollUtility();

  const mapContainer = mapContainerRef.current;
  const polylineRef = useRef<Polyline | null>(null);
  const [drawingStarted, setDrawingStarted] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);

  const toggleDraw = (enabled: boolean) => {
    if (!mapInstance) return;

    if (enabled) {
      mapInstance.setOptions({
        gestureHandling: "none"
      });
      return;
    }

    mapInstance.setOptions({
      gestureHandling: "auto"
    });
  };

  const _onShapeDraw = () => {
    if (polylineRef.current) {
      toggleDraw(false);
      setDrawingStarted(false);
      onShapeChanged?.(polylineRef.current);
    }
  };

  const clearSelection = () => {
    setDrawingStarted(false);
    setHasSelection(false);
    resetPolyline();
  };

  const cancelDrawing = () => {
    toggleDraw(false);
    clearSelection();
  };

  const startDrawing = () => {
    toggleDraw(true);
    setDrawingStarted(true);
  };

  const resetPolyline = () => {
    if (polylineRef?.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
      onShapeChanged?.(null);
    }
  };

  const initializePolyline = () => {
    resetPolyline();

    polylineRef.current = new google.maps.Polyline({
      strokeColor: "	#7c3aed",
      strokeOpacity: 1,
      strokeWeight: 3
    });
    polylineRef.current.setMap(mapInstance);
  };

  const triggerMouseMoveEventOnMap = () => {
    if (!coreLibrary || !mapInstance) return;
    coreLibrary.event.trigger(mapInstance, "mousemove");
  };

  const handleMouseDownListener = () => {
    enableOverscrollNone();
    initializePolyline();
    isMouseDownRef.current = true;
  };

  const handleMouseUpListener = () => {
    disableOverscrollNone();
    const path = polylineRef.current!.getPath().getArray();
    path.push(polylineRef.current!.getPath().getArray()[0]);
    polylineRef.current?.setPath(path);
    isMouseDownRef.current = false;
    setHasSelection(true);
    _onShapeDraw();
  };

  useEffect(() => {
    !isEnabled &&
      mapInstance?.setOptions({
        gestureHandling: "cooperative"
      });

    if (
      !isEnabled ||
      !mapInstance ||
      !coreLibrary ||
      !mapContainer ||
      !drawingStarted
    )
      return;

    mapInstance.setOptions({
      gestureHandling: "none"
    });

    const handleMapMouseMoveListener = (e: google.maps.MapMouseEvent) => {
      if (!isMouseDownRef.current || !e) {
        return;
      }
      const path = polylineRef.current!.getPath().getArray();
      path.push(e.latLng!);
      polylineRef.current!.setPath(path);
    };

    mapContainer.addEventListener("mousedown", handleMouseDownListener);
    mapContainer.addEventListener("mouseup", handleMouseUpListener);

    mapContainer.addEventListener("touchmove", triggerMouseMoveEventOnMap);
    mapContainer.addEventListener("touchstart", handleMouseDownListener);
    mapContainer.addEventListener("touchend", handleMouseUpListener);

    coreLibrary.event.addListener(
      mapInstance,
      "mousemove",
      handleMapMouseMoveListener
    );

    return () => {
      coreLibrary.event.clearListeners(mapInstance, "mousemove");

      mapContainer.removeEventListener("mousedown", handleMouseDownListener);
      mapContainer.removeEventListener("mouseup", handleMouseUpListener);

      mapContainer.removeEventListener("touchmove", triggerMouseMoveEventOnMap);
      mapContainer.removeEventListener("touchstart", handleMouseDownListener);
      mapContainer.removeEventListener("touchend", handleMouseUpListener);
    };
  }, [
    isEnabled,
    mapInstance,
    coreLibrary,
    mapContainer,
    hasSelection,
    drawingStarted
  ]);

  return {
    cancelDrawing,
    clearSelection,
    drawingStarted,
    hasSelection,
    startDrawing
  };
};

export default useFreehandShapeDrawer;
