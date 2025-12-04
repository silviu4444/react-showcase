export type AddRegionToFavoriteDto = {
  name: string;
  locations: {
    longitude: number;
    latitude: number;
  }[];
};
