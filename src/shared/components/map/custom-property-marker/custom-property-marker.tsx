import { DrawToSearchPin } from "@/pages/(search)/map/interfaces/search.interfaces";
import useCurrencyFormat from "@/shared/hooks/use-currency-format";
import { CustomPropertyMarkerMeta } from "@/shared/interfaces/map/custom-property-marker.interfaces";
import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./custom-property-marker.scss";

const favoriteClass = "custom-property-marker__favorite";

type CustomPropertyMakerProps = {
  pin: DrawToSearchPin;
  meta: CustomPropertyMarkerMeta | null;
  onTagClicked: (ids: string[]) => void;
};

const CustomPropertyMaker: React.FC<CustomPropertyMakerProps> = ({
  meta,
  pin,
  onTagClicked
}) => {
  const [t] = useTranslation();
  const mapInstance = useMap();
  const { currencyFormat } = useCurrencyFormat();
  const firstProperty = pin.properties[0];
  const hasMultipleProperties = pin.properties.length > 1;
  const isFavorite = pin.properties.some((property) => !!property.isFavorite);

  const contentRef = useRef<HTMLDivElement>();
  const detailsViewClass = "custom-property-marker__details-view";
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement>();
  const clickListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const onTagClickedRef = useRef(onTagClicked);

  useEffect(() => {
    onTagClickedRef.current = onTagClicked;
  }, [onTagClicked]);

  useEffect(() => {
    if (!mapInstance) {
      return;
    }
    const marker = document.createElement("div");
    marker.className = "custom-property-marker";
    isFavorite && marker.classList.add(favoriteClass);

    contentRef.current = marker;

    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
      map: mapInstance,
      position: {
        lat: pin.latitude,
        lng: pin.longitude
      },
      content: contentRef.current
    });

    clickListenerRef.current = google.maps.event.addListener(
      markerRef.current,
      "click",
      () => {
        onTagClickedRef.current(
          pin.properties.map(({ propertyId }) => propertyId)
        );
      }
    );

    return () => {
      if (markerRef.current) {
        markerRef.current.map = null;
      }

      if (clickListenerRef.current) {
        google.maps.event.removeListener(clickListenerRef.current);
      }
    };
  }, [mapInstance]);

  useEffect(() => {
    if (isFavorite) {
      markerRef.current?.classList.add(favoriteClass);
    } else {
      markerRef.current?.classList.remove(favoriteClass);
    }
  }, [pin]);

  useEffect(() => {
    const inBounds = meta?.bounds?.contains(
      new google.maps.LatLng(pin.latitude, pin.longitude)
    );

    const disableDetailsView = () => {
      if (
        inBounds &&
        contentRef.current?.classList.contains(detailsViewClass)
      ) {
        contentRef.current.classList.remove(detailsViewClass);
        contentRef.current.textContent = "";
      }
    };

    if (meta?.zoom! < 15) {
      disableDetailsView();
      return;
    }

    if (inBounds && contentRef.current) {
      contentRef.current.classList.add(detailsViewClass);
      contentRef.current.textContent = hasMultipleProperties
        ? `+${pin.properties.length.toString()} ${t("properties")}`.toLowerCase()
        : currencyFormat(firstProperty.price);
    }

    !inBounds && disableDetailsView();
  }, [meta]);

  return null;
};

export default CustomPropertyMaker;
