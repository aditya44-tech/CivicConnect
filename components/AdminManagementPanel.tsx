"use client";

import { useState } from "react";
import type { Complaint, Status } from "@/lib/data";
import Button from "./Button";
import StatusTimeline from "./StatusTimeline";
import { MapPinIcon } from "./icons";

// Static mock coordinates per complaint — keyed by id for demo realism
const COORDS: Record<string, { lat: string; lng: string; district: string }> = {
  c1:  { lat: "33.9850° N", lng: "118.4695° W", district: "Central Ward" },
  c2:  { lat: "33.9901° N", lng: "118.4723° W", district: "North Ward" },
  c3:  { lat: "33.9775° N", lng: "118.4610° W", district: "East Ward" },
  c4:  { lat: "33.9820° N", lng: "118.4780° W", district: "Harbor District" },
  c5:  { lat: "33.9790° N", lng: "118.4650° W", district: "West Ward" },
  c6:  { lat: "33.9910° N", lng: "118.4580° W", district: "North Ward" },
  c7:  { lat: "33.9840° N", lng: "118.4700° W", district: "School Zone" },
  c8:  { lat: "33.9760° N", lng: "118.4730° W", district: "River District" },
  c9:  { lat: "33.9870° N", lng: "118.4640° W", district: "South Ward" },
  c10: { lat: "33.9800° N", lng: "118.4690° W", district: "Harbor District" },
  c11: { lat: "33.9830° N", lng: "118.4760° W", district: "Canal District" },
  c12: { lat: "33.9785° N", lng: "118.4620° W", district: "West Ward" },
  c13: { lat: "33.9855° N", lng: "118.4670° W", district: "East Ward" },
  c14: { lat: "33.9815° N", lng: "118.4710° W", district: "Central Ward" },
};

export default function AdminManagementPanel({
  complaint,
}: {
  complaint: Complaint;
}) {
  const [status, setStatus] = useState<Status>(complaint.status);
  const [saved, setSaved] = useState(false);

  const geo = COORDS[complaint.id] ?? { lat: "33.9850° N", lng: "118.4695° W", district: "Riverside" };

  return (
    <div className="h-fit space-y-5">

      {/* ── 1. Update Status ─────────────────────────── */}
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200/70">
        <h2 className="text-base font-bold text-gray-900">Update status</h2>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as Status);
            setSaved(false);
          }}
          className="mt-3 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 outline-none transition-all focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <Button className="mt-4 w-full" onClick={() => setSaved(true)}>
          Save changes
        </Button>
        {saved && (
          <p className="mt-3 text-center text-sm font-semibold text-emerald-600">
            ✓ Saved
          </p>
        )}
      </div>

      {/* ── 2. Status Timeline ───────────────────────── */}
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200/70">
        <h2 className="mb-5 text-base font-bold text-gray-900">
          Progress Timeline
        </h2>
        <StatusTimeline status={status} direction="vertical" />
      </div>

      {/* ── 3. Location Data + Map Preview ───────────── */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200/70">
        {/* Map preview */}
        <div className="bg-map-grid relative flex h-36 w-full items-center justify-center border-b border-gray-100">
          <svg
            viewBox="0 0 320 144"
            className="absolute inset-0 h-full w-full opacity-20"
            aria-hidden="true"
          >
            <line x1="0"   y1="50"  x2="320" y2="50"  stroke="#1D1D1F" strokeWidth="6" />
            <line x1="0"   y1="96"  x2="320" y2="96"  stroke="#1D1D1F" strokeWidth="4" />
            <line x1="100" y1="0"   x2="100" y2="144" stroke="#1D1D1F" strokeWidth="4" />
            <line x1="220" y1="0"   x2="220" y2="144" stroke="#1D1D1F" strokeWidth="6" />
            <line x1="100" y1="50"  x2="220" y2="96"  stroke="#1D1D1F" strokeWidth="3" />
          </svg>
          <span className="relative z-10 flex flex-col items-center drop-shadow-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-primary/20">
              <MapPinIcon className="h-5 w-5 text-primary" />
            </span>
            <span className="mt-1 h-2 w-0.5 rounded-full bg-primary/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary/30" />
          </span>
          <span
            className="absolute z-0 h-14 w-14 animate-ping rounded-full bg-primary/10"
            style={{ animationDuration: "2.5s" }}
          />
        </div>

        {/* Data rows */}
        <div className="p-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Location Data
          </h3>
          <dl className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-500">District</dt>
              <dd className="font-semibold text-gray-900">{geo.district}</dd>
            </div>
            <div className="flex items-start justify-between text-sm">
              <dt className="text-gray-500">Coordinates</dt>
              <dd className="text-right font-mono text-xs font-semibold text-gray-700 leading-5">
                {geo.lat}<br />{geo.lng}
              </dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-500">Category</dt>
              <dd className="font-semibold text-gray-900">{complaint.category}</dd>
            </div>
            <div className="flex items-start justify-between text-sm">
              <dt className="text-gray-500">Address</dt>
              <dd className="max-w-[58%] text-right font-semibold text-gray-900 leading-snug">
                {complaint.address}
              </dd>
            </div>
          </dl>
        </div>
      </div>

    </div>
  );
}

