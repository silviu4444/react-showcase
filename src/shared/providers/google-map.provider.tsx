import { environment } from "@/environment";
import { APIProvider } from "@vis.gl/react-google-maps";
import { ReactNode, useState } from "react";
import { BiMap } from "react-icons/bi";
import { cn } from "../lib/utils";

export type GoogleMapsApiLibrariesType = "drawing" | "places" | "marker";

type GoogleMapsApiLoaderProps = {
  libraries: GoogleMapsApiLibrariesType[];
  children: ReactNode;
  className?: string;
};

const GoogleMapsApiLoader: React.FC<GoogleMapsApiLoaderProps> = ({
  className,
  children,
  libraries
}) => {
  const [loaded, setLoaded] = useState(false);

  const onLoaded = () => {
    setLoaded(true);
  };

  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      <APIProvider
        apiKey={environment.googleAPIKey}
        onLoad={onLoaded}
        language="en"
        libraries={libraries}
      >
        {loaded ? (
          children
        ) : (
          <BiMap className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 transform animate-pulse" />
        )}
      </APIProvider>
    </div>
  );
};

export default GoogleMapsApiLoader;
