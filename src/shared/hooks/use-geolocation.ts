import { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [hasGrantedLocation, setHasGrantedLocation] = useState(false);
  const [pending, setPending] = useState(true);

  const getCurrentLocation = () => {
    setPending(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPending(false);
        setHasGrantedLocation(true);
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        setPending(false);
        setHasGrantedLocation(false);
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    currentLocation,
    pending,
    hasGrantedLocation
  };
};

export default useGeoLocation;
