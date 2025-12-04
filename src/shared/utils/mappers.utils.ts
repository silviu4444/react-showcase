import { UserDef, UserDto } from "@/core/auth/interfaces/user.interfaces";
import {
  PROPERTY_CONDITIONS_TYPE,
  PROPERTY_FURNITURE_TYPE,
  PROPERTY_TYPE,
  RELATION_TYPE
} from "../constants/property.constants";
import { LatLngType } from "../interfaces/forms/address-autocomplete.interfaces";
import {
  PropertyPreviewDef,
  PropertyPreviewDto,
  PropertyTypeDef,
  PropertyTypeDto,
  QueryFiltersParams
} from "../interfaces/property/property.interfaces";

export function getLatLngFromPolyline(
  polyline: google.maps.Polyline
): LatLngType[] {
  const latLng: LatLngType[] = [];
  const paths = polyline.getPath();
  paths.forEach(({ lat, lng }) => latLng.push({ lat: lat(), lng: lng() }));
  return latLng;
}

export function getMapCornersFromBounds(bounds: google.maps.LatLngBounds) {
  const northEast = bounds.getNorthEast();
  const southWest = bounds.getSouthWest();

  const northWest = new google.maps.LatLng(northEast.lat(), southWest.lng());
  const southEast = new google.maps.LatLng(southWest.lat(), northEast.lng());

  return {
    northeast: northEast.toJSON(),
    northwest: northWest.toJSON(),
    southwest: southWest.toJSON(),
    southeast: southEast.toJSON()
  };
}

export function mapToQueryParams({
  form
}: {
  form: Partial<QueryFiltersParams>;
  coordinates?: string;
}): QueryFiltersParams {
  const lat = +(form.lat || 0) > 0 ? form.lat : 0;
  const lng = +(form.lng || 0) > 0 ? form.lng : 0;
  const queryParams: QueryFiltersParams = {
    city: form.city || "",
    lat: lat || "",
    lng: lng || "",
    pId: form.pId || "",
    rt: (form.rt || RELATION_TYPE.RENT).toLowerCase() as RELATION_TYPE,
    pt: (form.pt || PROPERTY_TYPE.APARTMENT).toLowerCase() as PROPERTY_TYPE,
    surface: form.surface,
    pc: form.pc?.toLowerCase() as PROPERTY_CONDITIONS_TYPE,
    rn: form.rn,
    bn: form.bn,
    pf: form.pf?.toLowerCase() as PROPERTY_FURNITURE_TYPE,
    airC: form["airC"],
    wotw: form["wotw"],
    terrace: form["terrace"],
    balcony: form["balcony"],
    cellar: form["cellar"],
    garage: form["garage"],
    petF: form.petF,
    priceF: form.priceF?.toString(),
    priceT: form.priceT?.toString(),
    wria: form.rt === RELATION_TYPE.SELL ? false : form.wria,
    hasElevator: form.hasElevator,
    zoom: form.zoom || "",
    page: form.page || ""
  };
  return Object.fromEntries(
    Object.entries(queryParams).filter(([_, v]) => !!v)
  ) as QueryFiltersParams;
}

export function getTruthySearchParams(
  params: QueryFiltersParams
): QueryFiltersParams {
  const queryParams: QueryFiltersParams = {
    pId: params.pId,
    city: params.city,
    lat: params.lat,
    lng: params.lng,
    airC: params.airC,
    balcony: params.balcony,
    bn: params.bn,
    cellar: params.cellar,
    pf: params.pf?.toUpperCase() as PROPERTY_FURNITURE_TYPE,
    garage: params.garage,
    hasElevator: params.hasElevator,
    pc: params.pc?.toUpperCase() as PROPERTY_CONDITIONS_TYPE,
    rt: params.rt?.toUpperCase() as RELATION_TYPE,
    pt: params.pt?.toUpperCase() as PROPERTY_TYPE,
    petF: params.petF,
    priceF: params.priceF,
    priceT: params.priceT,
    rn: params.rn,
    surface: params.surface,
    terrace: params.terrace,
    wotw: params.wotw,
    wria: params.wria,
    zoom: params.zoom,
    page: params.page
  };

  return Object.fromEntries(
    Object.entries(queryParams).filter(([_, v]) => !!v)
  ) as QueryFiltersParams;
}

export function mapPropertyDtoToDef(
  property: PropertyTypeDto
): PropertyTypeDef {
  return {
    id: property.id!,
    relationType: property.relationType,
    price: property.price,
    description: property.description,
    expensesMonthly: property.expensesMonthly,
    contactPreference: property.contactPreference,
    details: {
      propertyType: property.details.propertyType,
      conditions: property.details.conditions,
      address: property.details.address,
      isLastFloor: property.details.isLastFloor,
      surface: property.details.surface,
      roomNumber: property.details.roomNumber,
      bathroomNumber: property.details.bathroomNumber,
      hasElevator: property.details.hasElevator,
      furniture: property.details.furniture,
      commodities: {
        hasAirConditioning: property.details.commodities.hasAirConditioning,
        hasClosetInTheWall: property.details.commodities.hasClosetInTheWall,
        hasBalcony: property.details.commodities.hasBalcony,
        hasCellar: property.details.commodities.hasCellar,
        hasParking: property.details.commodities.hasParking,
        hasTerrace: property.details.commodities.hasTerrace
      },
      residentialComplex: property.details.address.residenceComplex
    },
    contractDetails: {
      ...property.contractDetails,
      rentInAdvance: property.contractDetails.rentInAdvance.toString()
    },
    user: property.user,
    photos: property.photos,
    isFavorite: !!property.isFavorite,
    status: property.status,
    views: property.views,
    createdAt: property.createdAt,
    updatedAt: property.updatedAt
  };
}

export function mapPropertyPreviewDtoToDef(
  data: PropertyPreviewDto
): PropertyPreviewDef {
  return {
    id: data.id,
    contact: {
      contactPreference: data.contactPreference,
      phoneNumber: "" // TODO map this value when BE is ready
    },
    isFavorite: data.isFavorite,
    ownerId: data.ownerId,
    photos: data.photos,
    price: data.price,
    details: data.details,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
}

export function mapUserDtoToDef(user: UserDto): UserDef {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    picture: user.picture,
    role: user.authority,
    createdAt: user.createdAt
  };
}
