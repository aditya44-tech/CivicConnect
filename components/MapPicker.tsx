"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafMap, Marker, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { CrosshairIcon } from "@/components/icons";

export interface LatLng {
  lat: number;
  lng: number;
}

const SHIRPUR: LatLng = { lat: 21.3503, lng: 74.8786 };

const PIN_SVG = `
  <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));">
    <path d="M17 0C7.6 0 0 7.6 0 17c0 12.75 17 27 17 27s17-14.25 17-27C34 7.6 26.4 0 17 0z" fill="#1D1D1F"/>
    <circle cx="17" cy="17" r="7" fill="white"/>
  </svg>`;

/** Builds a Leaflet icon — L is loaded dynamically to avoid SSR `window` access */
function pinIcon(L: typeof import("leaflet")) {
  return L.divIcon({
    className: "",
    html: PIN_SVG,
    iconSize: [34, 44],
    iconAnchor: [17, 44],
  });
}

async function loadLeaflet() {
  return (await import("leaflet")).default;
}

export default function MapPicker({
  value,
  onChange,
  height = "h-56",
  autoLocate = true,
}: {
  value?: LatLng | null;
  onChange?: (p: LatLng) => void;
  height?: string;
  /** Try to detect the user's position automatically when the map loads. */
  autoLocate?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [locating, setLocating] = useState(false);

  // Snapshot the value at mount so the init effect never goes stale
  const initialValueRef = useRef(value);

  /** Places the marker at a position, recenters the map, and reports the pick. */
  const applyPosition = async (
    map: LeafMap,
    p: LatLng,
    { fly = true, zoom = 15 }: { fly?: boolean; zoom?: number } = {}
  ) => {
    const L = await loadLeaflet();
    const latlng = L.latLng(p.lat, p.lng);
    if (fly) map.flyTo(latlng, zoom);
    else map.setView(latlng, zoom);
    if (markerRef.current) markerRef.current.setLatLng(latlng);
    else markerRef.current = L.marker(latlng, { icon: pinIcon(L) }).addTo(map);
    onChange?.(p);
  };

  /** One-shot geolocation with a reasonable timeout; silently ignored if denied. */
  const detectPosition = (
    map: LeafMap,
    onSuccess?: (p: LatLng) => void
  ) => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        await applyPosition(map, p);
        onSuccess?.(p);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  };

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      const L = await loadLeaflet();
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [SHIRPUR.lat, SHIRPUR.lng],
        zoom: 13,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      map.on("click", (e: LeafletMouseEvent) => {
        const p = { lat: e.latlng.lat, lng: e.latlng.lng };
        if (markerRef.current) markerRef.current.setLatLng(e.latlng);
        else markerRef.current = L.marker(e.latlng, { icon: pinIcon(L) }).addTo(map);
        onChange?.(p);
      });

      // Pre-placed pin (e.g. form was re-opened with a saved location)
      const initial = initialValueRef.current;
      if (initial && !markerRef.current) {
        markerRef.current = L.marker([initial.lat, initial.lng], { icon: pinIcon(L) }).addTo(map);
        map.setView([initial.lat, initial.lng], 15);
      } else if (autoLocate) {
        // Auto-locate: center on the user once the map is ready
        detectPosition(map);
      }
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the marker in sync when the value changes externally
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !value) return;
    (async () => {
      const L = await loadLeaflet();
      const latlng = L.latLng(value.lat, value.lng);
      if (markerRef.current) markerRef.current.setLatLng(latlng);
      else markerRef.current = L.marker(latlng, { icon: pinIcon(L) }).addTo(map);
    })();
  }, [value]);

  const locateMe = () => {
    const map = mapRef.current;
    if (!map || locating) return;
    detectPosition(map);
  };

  return (
    <div className="relative">
      <div ref={containerRef} className={`${height} w-full rounded-xl bg-surface-soft`} />
      <button
        type="button"
        onClick={locateMe}
        disabled={locating}
        className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-hairline bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-gray-700 shadow-sm backdrop-blur transition-colors hover:bg-white disabled:opacity-70"
      >
        <CrosshairIcon
          className={`h-3.5 w-3.5 text-primary ${locating ? "animate-spin" : ""}`}
        />
        {locating ? "Locating…" : "Locate Me"}
      </button>
      {value && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
          {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
        </span>
      )}
    </div>
  );
}
