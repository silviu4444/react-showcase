import { ENDPOINTS } from "@/shared/constants/endpoints.constants";
import {
  PROPERTY_TYPE,
  RELATION_TYPE
} from "@/shared/constants/property.constants";
import {
  BasicSearchFiltersDef,
  PreviewPropertyDto,
  PropertyPreviewDef
} from "@/shared/interfaces/property/property.interfaces";
import axiosInstance from "@/shared/lib/axios";
import { mapDto, mapDtoWithPagination } from "@/shared/utils/dto.utils";
import {
  getLatLngFromPolyline,
  getMapCornersFromBounds,
  mapPropertyPreviewDtoToDef
} from "@/shared/utils/mappers.utils";
import { AxiosResponse } from "axios";
import {
  DrawToSearchPropertiesDto,
  DrawToSearchPropertyResponseDto,
  GeoCoordinatesDto
} from "../interfaces/search.interfaces";

type PreviewPropertiesData = {
  list: PropertyPreviewDef[];
  pageData: {
    page: number;
    count: number;
    lastPage: number;
  };
};

type SearchByDrawType = {
  polyline: google.maps.Polyline;
  propertyType: PROPERTY_TYPE;
  relationType: RELATION_TYPE;
};

export async function searchByDraw(
  payload: SearchByDrawType,
  isAuthenticated: boolean
): Promise<DrawToSearchPropertyResponseDto["data"]> {
  const dto: DrawToSearchPropertiesDto = {
    data: {
      propertyType: payload.propertyType,
      relationType: payload.relationType,
      geoCoordinates: getLatLngFromPolyline(payload.polyline!).map(
        ({ lat, lng }) => ({
          latitude: lat,
          longitude: lng
        })
      )
    }
  };

  return axiosInstance
    .post<
      DrawToSearchPropertiesDto,
      AxiosResponse<DrawToSearchPropertyResponseDto>
    >(ENDPOINTS.PROPERTY.DRAW_TO_SEARCH(isAuthenticated), dto)
    .then(mapDto());
}

type PreviewPropertiesPayload = {
  page: number;
  bounds: google.maps.LatLngBounds | null;
  polyline: google.maps.Polyline | null;
  basicFilters: BasicSearchFiltersDef;
  signal: AbortSignal;
  isAuthenticated: boolean;
};

export async function previewProperties({
  basicFilters,
  bounds,
  page,
  polyline,
  signal,
  isAuthenticated
}: PreviewPropertiesPayload): Promise<PreviewPropertiesData> {
  let geoCoordinatesByBounds: GeoCoordinatesDto[] = [];

  if (bounds && !polyline) {
    const corners = getMapCornersFromBounds(bounds);
    geoCoordinatesByBounds = [
      {
        latitude: corners.northeast.lat,
        longitude: corners.northeast.lng
      },
      {
        latitude: corners.northwest.lat,
        longitude: corners.northwest.lng
      },
      {
        latitude: corners.southwest.lat,
        longitude: corners.southwest.lng
      },
      {
        latitude: corners.southeast.lat,
        longitude: corners.southeast.lng
      },
      {
        latitude: corners.northeast.lat,
        longitude: corners.northeast.lng
      }
    ];
  }

  const dto: DrawToSearchPropertiesDto = {
    data: {
      propertyType: basicFilters.propertyType,
      relationType: basicFilters.relationType,
      geoCoordinates: geoCoordinatesByBounds.length
        ? geoCoordinatesByBounds
        : getLatLngFromPolyline(polyline!).map(({ lat, lng }) => ({
            latitude: lat,
            longitude: lng
          }))
    }
  };

  return axiosInstance
    .post<DrawToSearchPropertiesDto, AxiosResponse<PreviewPropertyDto>>(
      ENDPOINTS.PROPERTY.PREVIEWS(isAuthenticated, page),
      dto,
      { signal }
    )
    .then(mapDtoWithPagination())
    .then(
      ({ data, pagination }) =>
        ({
          list: data.propertiesPreview.map((property) =>
            mapPropertyPreviewDtoToDef(property)
          ),
          pageData: {
            page: pagination.page,
            count: pagination.total,
            lastPage: pagination.lastPage
          }
        }) satisfies PreviewPropertiesData
    );
}
