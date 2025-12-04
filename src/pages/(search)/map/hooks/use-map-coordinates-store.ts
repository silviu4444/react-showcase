import { create } from "zustand";

type UpdateStoreData = {
  polyline?: google.maps.Polyline | null;
  bounds?: google.maps.LatLngBounds | null;
};

interface MapCoordinatesStore {
  polyline: google.maps.Polyline | null;
  bounds: google.maps.LatLngBounds | null;
  update: (value: UpdateStoreData) => void;
}

export const useMapCoordinatesStore = create<MapCoordinatesStore>(
  (set, get) => ({
    bounds: null,
    polyline: null,
    zoom: 12,
    update: (value: UpdateStoreData) => set({ ...get(), ...value })
  })
);
