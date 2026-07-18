"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";
import * as SunCalc from "suncalc";

// Fix leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapPlannerProps {
  date: Date;
  location: { lat: number; lng: number };
  onLocationChange: (loc: { lat: number; lng: number }) => void;
}

function LocationMarker({ location, onLocationChange }: any) {
  const map = useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return location === null ? null : (
    <Marker position={location} />
  );
}

export default function MapPlanner({ date, location, onLocationChange }: MapPlannerProps) {
  const [sunLine, setSunLine] = useState<[number, number][]>([]);
  const [moonLine, setMoonLine] = useState<[number, number][]>([]);

  useEffect(() => {
    if (!location) return;

    // Calculate Sun position
    const sunPos = SunCalc.getPosition(date, location.lat, location.lng);
    const sunAzimuth = sunPos.azimuth + Math.PI; // Convert to standard degrees
    
    const distance = 0.5; // roughly 50km in coordinates
    const sunEndLat = location.lat + Math.cos(sunAzimuth) * distance;
    const sunEndLng = location.lng + Math.sin(sunAzimuth) * distance;

    setSunLine([
      [location.lat, location.lng],
      [sunEndLat, sunEndLng],
    ]);

    // Calculate Moon position
    const moonPos = SunCalc.getMoonPosition(date, location.lat, location.lng);
    const moonAzimuth = moonPos.azimuth + Math.PI;
    const moonEndLat = location.lat + Math.cos(moonAzimuth) * distance;
    const moonEndLng = location.lng + Math.sin(moonAzimuth) * distance;

    setMoonLine([
      [location.lat, location.lng],
      [moonEndLat, moonEndLng],
    ]);
  }, [date, location]);

  return (
    <MapContainer
      center={location}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full min-h-[400px] z-0 rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      
      <LocationMarker location={location} onLocationChange={onLocationChange} />

      {/* Sun Line - Golden/Yellow */}
      {sunLine.length > 0 && (
        <Polyline positions={sunLine} color="#fbbf24" weight={3} dashArray="5, 10" />
      )}

      {/* Moon Line - Blue/White */}
      {moonLine.length > 0 && (
        <Polyline positions={moonLine} color="#93c5fd" weight={3} dashArray="5, 10" />
      )}
    </MapContainer>
  );
}
