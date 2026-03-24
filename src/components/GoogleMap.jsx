import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "1000px"
};

const center = {
  lat: 6.9271, // example: Colombo latitude
  lng: 79.8612 // example: Colombo longitude
};

const GoogleMapCom = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_MAP_API
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {/* Markers or other components go here */}
    </GoogleMap>
  );
};

export default GoogleMapCom;