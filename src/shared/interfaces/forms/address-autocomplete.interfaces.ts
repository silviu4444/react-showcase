export type LatLngType = {
  lat: number;
  lng: number;
};

export type AddressAutocompleteValueDef = {
  inputValue: string;
  streetNumber?: string;
  street?: string;
  city?: string;
  country?: string;
  county?: string;
  postalCode?: string;
  lat: number;
  lng: number;
} & LatLngType;

export type AddressAutocompleteType = "geocode" | "(cities)" | "address";
