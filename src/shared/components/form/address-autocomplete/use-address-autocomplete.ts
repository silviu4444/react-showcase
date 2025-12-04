import { environment } from "@/environment";
import { localizationEnum } from "@/shared/constants/i18n.constants";
import { useDebounceValue } from "@/shared/hooks/use-debounce-value";
import { AddressAutocompleteType } from "@/shared/interfaces/forms/address-autocomplete.interfaces";
import { AddressAutocompleteValueDef } from "@/shared/schemas/address-autocomplete.schema";
import { removeCountryFromAddress } from "@/shared/utils/form.utils";
import {
  ChangeEventHandler,
  MutableRefObject,
  useEffect,
  useState
} from "react";

const REMOVE_COUNTRY_FROM_SUGGESTION: Record<localizationEnum, string> = {
  md: "Moldova",
  ro: "Romania"
};

type useAddressAutocompleteProps = {
  defaultValue?: AddressAutocompleteValueDef;
  apiLoaded: boolean;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  type: AddressAutocompleteType;
};

const useAddressAutocomplete = ({
  apiLoaded,
  defaultValue,
  inputRef,
  type
}: useAddressAutocompleteProps) => {
  const [address, setAddress] = useState<AddressAutocompleteValueDef>(
    defaultValue || {
      inputValue: "",
      city: "",
      lat: 0,
      lng: 0
    }
  );

  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounceValue({ value: inputValue });

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.AutocompleteService>();
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService>();
  const [predictions, setPrediction] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (debouncedInputValue) {
      requestAutocompletion();
    } else {
      setPrediction([]);
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    apiLoaded && inputRef && initPlaceAutocomplete();
  }, [apiLoaded, inputRef]);

  useEffect(() => {
    inputRef?.current &&
      defaultValue &&
      (inputRef.current.value = defaultValue.inputValue);
  }, [inputRef, defaultValue]);

  const initPlaceAutocomplete = () => {
    const autocomplete = new google.maps.places.AutocompleteService();
    const placesService = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    setAutocomplete(autocomplete);
    setPlacesService(placesService);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setInputValue(event.target.value);

  const requestAutocompletion = () => {
    const options: google.maps.places.AutocompletionRequest = {
      input: debouncedInputValue,
      componentRestrictions: {
        country:
          environment.localization === localizationEnum.MD
            ? localizationEnum.MD
            : localizationEnum.RO
      },
      types: [type]
    };
    setIsLoading(true);
    autocomplete?.getPlacePredictions(options, (predictions, status) => {
      setIsLoading(false);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setPrediction(
          (predictions || []).map((prediction) => ({
            ...prediction,
            description: removeCountryFromAddress(
              prediction.description,
              REMOVE_COUNTRY_FROM_SUGGESTION[environment.localization]
            )
          }))
        );
        return;
      }

      setPrediction([]);
    });
  };

  const handleSelect = (placeId: string) => {
    setPrediction([]);
    setIsLoading(true);
    const request: google.maps.places.PlaceDetailsRequest = {
      placeId,
      fields: [
        "name",
        "formatted_address",
        "address_components",
        "geometry",
        "place_id"
      ]
    };
    placesService?.getDetails(request, (placeResult, status) => {
      setIsLoading(false);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const place = placeResult!;
        if (place.geometry?.location) {
          const streetNumber = (
            place.address_components?.find((component) =>
              component.types.includes("street_number")
            )?.long_name || ""
          )
            .split("nr.")
            .filter(Boolean)
            .join("")
            .trim();

          const street =
            place.address_components?.find((component) =>
              component.types.includes("route")
            )?.long_name || "";

          const city =
            place.address_components?.find((component) =>
              component.types.includes("locality")
            )?.long_name || "";

          const country =
            place.address_components?.find((component) =>
              component.types.includes("country")
            )?.long_name || "";

          const county = (
            place.address_components?.find((component) =>
              component.types.includes("administrative_area_level_1")
            )?.long_name || ""
          )
            .split("Județul")
            .join("")
            .split("County")
            .filter(Boolean)
            .join("")
            .trim();

          const postalCode =
            place.address_components?.find((component) =>
              component.types.includes("postal_code")
            )?.long_name || "";

          setAddress({
            inputValue:
              place.formatted_address || inputRef?.current?.value || "",
            lat: place.geometry?.location.lat(),
            lng: place.geometry?.location.lng(),
            streetNumber,
            street,
            city,
            country,
            county,
            postalCode
          });
        }
      }
    });
  };

  return {
    selectedAddress: address,
    handleChange,
    handleSelect,
    isLoading,
    predictions
  };
};

export default useAddressAutocomplete;
