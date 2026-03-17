"use client";

import "leaflet/dist/leaflet.css";

import { useRouter } from "next/navigation";
import { memo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import surfSpots from "@/lib/surf-spots.json";

type MapSpot = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

const mapSpots = surfSpots as MapSpot[];
const defaultMapCenter: [number, number] = [0, 0];
const spotMarkerIcon = L.divIcon({
  className: "surf-map-marker",
  html: '<span class="surf-map-marker-dot"></span>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

export const SurfMap = memo(function SurfMap() {
  const router = useRouter();

  return (
    <section className="mb-10 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-xl font-semibold text-slate-900">Surf spots map</h2>
      <p className="mt-2 text-sm text-slate-600">Tap a marker to open the surf spot details.</p>

      <div className="mt-4 h-[320px] w-full overflow-hidden rounded-lg border border-slate-200 sm:h-[420px]">
        <MapContainer center={defaultMapCenter} zoom={2} minZoom={2} scrollWheelZoom className="h-full w-full" preferCanvas worldCopyJump>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.latitude, spot.longitude]}
              icon={spotMarkerIcon}
              eventHandlers={{ click: () => router.push(`/spots/${spot.id}`) }}
            >
              <Popup>
                <button className="cursor-pointer text-sm font-semibold text-cyan-700" onClick={() => router.push(`/spots/${spot.id}`)}>
                  {spot.name}
                </button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
});
