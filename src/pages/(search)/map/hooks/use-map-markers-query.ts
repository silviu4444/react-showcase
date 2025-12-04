import { useState } from "react";
import { useQueryFilters } from "../../../../shared/providers/query-filters-provider";
import { DrawToSearchPin } from "../interfaces/search.interfaces";
import { useMapCoordinatesStore } from "./use-map-coordinates-store";
import useSearchPropertiesByBounds from "./use-search-properties-by-bounds";
import useSearchPropertiesByDraw from "./use-search-properties-by-draw";

const useMapMarkersQuery = () => {
  const { polyline, bounds } = useMapCoordinatesStore();
  const basicFilters = useQueryFilters(({ basicFilters }) => basicFilters);
  const [isDrawing, setIsDrawing] = useState(false);

  const {
    data: dataByPolyline,
    isSuccess: isSuccessByPolyline,
    isFetching: isFetchingByPolyline
  } = useSearchPropertiesByDraw({
    basicFilters,
    polyline
  });

  const {
    data: dataByBounds,
    isSuccess: isSuccessByBounds,
    isFetching: isFetchingByBounds
  } = useSearchPropertiesByBounds({
    bounds,
    basicFilters,
    enabled: !!bounds && !polyline && !isDrawing
  });

  const mapMarkers: DrawToSearchPin[] | null = polyline
    ? dataByPolyline?.pins || null
    : dataByBounds?.pins || null;

  return {
    markers: isFetchingByPolyline || isDrawing ? null : mapMarkers,
    isFetchingMarkers: isFetchingByPolyline || isFetchingByBounds,
    isSuccess: isSuccessByPolyline || isSuccessByBounds,
    onDrawingStarted: setIsDrawing
  };
};

export default useMapMarkersQuery;
