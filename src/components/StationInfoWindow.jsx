import React from "react";
import { InfoWindow } from "@react-google-maps/api";

const StationInfoWindow = ({ selectedStation, onClose }) => {
  if (!selectedStation) return null;

  return (
    <InfoWindow
      position={selectedStation.location}
      onCloseClick={onClose}
    >
      <div className="p-2.5 min-w-[200px]">
        <h3 className="m-0 mb-2 text-base font-semibold">
          {selectedStation.name}
        </h3>
        <p className="m-0 mb-1 text-sm">
          <strong>Latitude:</strong> {selectedStation.location.lat.toFixed(4)}
        </p>
        <p className="m-0 mb-1 text-sm">
          <strong>Longitude:</strong> {selectedStation.location.lng.toFixed(4)}
        </p>
        <button
          onClick={onClose}
          className="mt-2.5 px-2.5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-sm"
        >
          Close
        </button>
      </div>
    </InfoWindow>
  );
};

export default StationInfoWindow;
