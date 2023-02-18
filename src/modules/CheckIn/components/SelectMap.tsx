import { Location, LocationType } from "../pages/SelectLocation";
import { useEffect, useRef } from "react";
import LocationPicker from "location-picker";
import { Button } from "@mui/material";
import { api } from "../../../common/api";

interface SelectMapProps {
  setLocation: (location: Location) => void;
  setShowMap: (showMap: boolean) => void;
  location: Location;
}

export const SelectMap = (props: SelectMapProps) => {
  const { setLocation, setShowMap, location } = props;
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const locationPicker = new LocationPicker(
      mapRef.current.id,
      {
        setCurrentPosition: true,
        lat: 0,
        lng: 0,
      },
      {
        zoom: 15,
      }
    );
    locationPicker.map.setOptions({
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: false,
      mapTypeControl: false,
    });
    google.maps.event.addListener(
      locationPicker.map,
      "idle",
      async function () {
        const location = locationPicker.getMarkerPosition();
        setLocation({
          type: LocationType.LAT_LONG,
          name: `${location.lat},${location.lng},`,
        });
      }
    );
    //get location browser
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      locationPicker.map.setCenter(location);
    });
  }, []);
  return (
    <div className="w-screen h-screen fixed inset-0 z-30 bg-white">
      <div className="w-full h-full flex z-20" ref={mapRef} id="map"></div>
      <div className="top-2 right-2 z-30 absolute">
        <Button
          variant="contained"
          onClick={() => {
            setShowMap(false);
            setLocation({ type: LocationType.UNKNOWN });
          }}
          size="small"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>
      <div className="bottom-4 left-1/2 -translate-x-1/2 z-30 absolute">
        <Button
          variant="contained"
          onClick={async () => {
            const lat = location.name?.split(",")[0];
            const lng = location.name?.split(",")[1];
            const res = await api.post("/engage/geocode", {
              lat,
              lng,
            });
            setLocation({
              type: LocationType.LAT_LONG,
              name: `${lat},${lng},${res.data.results[0].formatted_address
                .split(", ")
                .join(" ")}`,
            });
            setShowMap(false);
          }}
          size="large"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          เลือกตำแหน่งนี้
        </Button>
      </div>
    </div>
  );
};
