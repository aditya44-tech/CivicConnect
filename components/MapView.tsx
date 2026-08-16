"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPinIcon } from "@/components/icons";

const SHIRPUR = { lat: 21.3503, lng: 74.8786 };

const PIN_SVG = `
  <svg width="30" height="39" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));">
    <path d="M17 0C7.6 0 0 7.6 0 17c0 12.75 17 27 17 27s17-14.25 17-27C34 7.6 26.4 0 17 0z" fill="#1D1D1F"/>
    <circle cx="17" cy="17" r="7" fill="white"/>
  </svg>`;

export default function MapView({
  latitude,
  longitude,
  height = "h-40",
  interactive = false,
}: {
  latitude?: number | null;
  longitude?: number | null;
  height?: string;
  /** Enable panning, zoom controls and wheel zoom (for admin review). */
  interactive?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const hasCoords =
        typeof latitude === "number" && typeof longitude === "number";
      const center: [number, number] = hasCoords
        ? [latitude!, longitude!]
        : [SHIRPUR.lat, SHIRPUR.lng];

      const map = L.map(containerRef.current, {
        center,
        zoom: hasCoords ? 15 : 13,
        attributionControl: interactive,
        scrollWheelZoom: interactive,
        dragging: interactive,
        touchZoom: interactive,
        doubleClickZoom: interactive,
        boxZoom: interactive,
        keyboard: interactive,
        zoomControl: interactive,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      if (hasCoords) {
        L.marker(center, {
          icon: L.divIcon({
            className: "",
            html: PIN_SVG,
            iconSize: [34, 44],
            iconAnchor: [17, 44],
          }),
        }).addTo(map);
      }
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [latitude, longitude]);

  return (
    <div className="relative">
      <div ref={containerRef} className={`${height} w-full bg-map-grid`} />
      {!(typeof latitude === "number" && typeof longitude === "number") && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-surface-card p-3 ring-1 ring-hairline shadow-sm">
            <MapPinIcon className="h-5 w-5 text-primary" />
          </span>
        </span>
      )}
    </div>
  );
}
