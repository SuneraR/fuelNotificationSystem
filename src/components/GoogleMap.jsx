import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import StationInfoWindow from "./StationInfoWindow";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 6.9271, // example: Colombo latitude
  lng: 79.8612, // example: Colombo longitude
};

const GoogleMapCom = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: ["places"], // if you need additional libraries, add them here
  });

  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div"),
    );

    const request = {
      location: center,
      radius: 500000, // 50 km radius
      type: "gas_station",
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const fuelStations = results.map((place) => ({
          id: place.place_id,
          name: place.name,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        }));
        setStations(fuelStations);
      }else {
    console.error("Places API error:", status);
  }
    });
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {stations.map((station)=>(
        <Marker
          key={station.id}
          position={station.location}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          }}
          onClick={() => setSelectedStation(station)}
        />
      ))}
      
      <StationInfoWindow 
        selectedStation={selectedStation} 
        onClose={() => setSelectedStation(null)}
      />
    </GoogleMap>
  );
};

export default GoogleMapCom;
