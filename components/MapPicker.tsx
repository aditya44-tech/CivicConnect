"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import type { Ref } from "react";
import type { Map as LeafMap, Marker, LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";

export interface LatLng {
  lat: number;
  lng: number;
}

/** Lets the parent trigger geolocation from a button rendered outside the map. */
export interface MapPickerHandle {
  /** Detect the user's position and drop the pin. Resolves when finished. */
  locate: () => Promise<void>;
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
  ref,
}: {
  value?: LatLng | null;
  onChange?: (p: LatLng) => void;
  height?: string;
  /** Try to detect the user's position automatically when the map loads. */
  autoLocate?: boolean;
  ref?: Ref<MapPickerHandle>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  // Snapshot the value at mount so the init effect never goes stale
  const initialValueRef = useRef(value);
  // Resolved once the map is initialized, so an early "Locate Me" click waits
  const readyRef = useRef<{ promise: Promise<void>; resolve: () => void } | null>(null);
  if (!readyRef.current) {
    let resolveFn: () => void = () => {};
    readyRef.current = {
      promise: new Promise<void>((resolve) => {
        resolveFn = resolve;
      }),
      resolve: () => resolveFn(),
    };
  }

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

  /**
   * One-shot geolocation with a reasonable timeout. Resolves when the position
   * is applied or the request is denied/unsupported.
   */
  const detectPosition = (map: LeafMap): Promise<void> =>
    new Promise((resolve) => {
      if (!navigator.geolocation) return resolve();
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await applyPosition(map, {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          resolve();
        },
        () => resolve(),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
      );
    });

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
      readyRef.current?.resolve();

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
      readyRef.current?.resolve();
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

  useImperativeHandle(
    ref,
    () => ({
      async locate() {
        await readyRef.current?.promise;
        const map = mapRef.current;
        if (map) await detectPosition(map);
      },
    }),
    []
  );

  return (
    <div className="relative">
      <div ref={containerRef} className={`${height} w-full rounded-xl bg-surface-soft`} />
      {value && (
        <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] font-semibold text-white backdrop-blur-sm">
          {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
        </span>
      )}
    </div>
  );
}
