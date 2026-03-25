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

const locations = [
  { lat: 6.5856, lng: 79.9600 }, // Kalutara
  { lat: 6.9271, lng: 79.8612 }, // Colombo
  { lat: 7.2906, lng: 80.6337 }, // Kandy
  { lat: 6.0535, lng: 80.2210 }, // Galle
  { lat: 9.6615, lng: 80.0255 }, // Jaffna
  { lat: 8.3596, lng: 81.2205 }, // Trincomalee
  { lat: 7.8731, lng: 81.6746 }, // Polonnaruwa
  { lat: 6.9278, lng: 81.1231 }, // Batticaloa
  { lat: 6.7180, lng: 79.9928 }, // Negombo
  { lat: 6.7070, lng: 80.0220 }, // Kurunegala
  { lat: 6.8141, lng: 79.9663 }, // Matale
  { lat: 7.2163, lng: 80.7480 }, // Dambulla
  { lat: 7.9519, lng: 79.8478 }, // Anuradhapura
];

const GoogleMapCom = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries: ["places"], // if you need additional libraries, add them here
  });

  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchStations = async () => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div"),
      );

      const stationMap = new Map(); // Use Map to deduplicate by place_id
      let completedRequests = 0;

      locations.forEach((loc) => {
        const request = {
          location: loc,
          radius: 50000, // 50 km radius
          type: "gas_station",
        };

        service.nearbySearch(request, (results, status) => {
          completedRequests++;

          if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
            results.forEach((place) => {
              // Only add if not already in the map (deduplication)
              if (!stationMap.has(place.place_id)) {
                stationMap.set(place.place_id, {
                  id: place.place_id,
                  name: place.name,
                  location: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                });
              }
            });
          } else if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
            console.error("Places API error:", status);
          }

          // Update state only after all requests are completed
          if (completedRequests === locations.length) {
            setStations(Array.from(stationMap.values()));
          }
        });
      });
    };

    fetchStations();
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {stations.map((station) => (
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
