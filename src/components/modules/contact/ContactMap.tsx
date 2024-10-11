"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

const MyMapComponent = () => {
  const position: LatLngTuple = [24.868925, 91.876171];

  // State to manage if Leaflet is loaded
  const [customMarkerIcon, setCustomMarkerIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    const iconUrl = "./dist/images/marker-icon.png";
    const iconRetinaUrl = "./dist/images/marker-icon-2x.png";
    const shadowUrl = "./dist/images/marker-shadow.png";

    const icon = new L.Icon({
      iconUrl,
      iconRetinaUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    setCustomMarkerIcon(icon);
  }, []);

  if (!customMarkerIcon) {
    return null;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%", borderRadius: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customMarkerIcon}>
        <Popup>This is Sylhet, Bangladesh!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMapComponent;
