"use client";

import { useState } from "react";
import type { Complaint, Status } from "@/lib/data";
import Button from "./Button";
import StatusTimeline from "./StatusTimeline";

export default function AdminManagementPanel({
  complaintId,
  complaint,
}: {
  complaintId: string;
  complaint: Complaint;
}) {
  const [status, setStatus] = useState<Status>(complaint.status);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/complaints/${complaintId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't save the status.");
        return;
      }
      setSaved(true);
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  };

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
          <option value="Ongoing">Ongoing</option>
          <option value="Resolved">Resolved</option>
        </select>

        <Button className="mt-4 w-full" onClick={save} disabled={busy}>
          {busy ? "Saving…" : "Save changes"}
        </Button>
        {saved && (
          <p className="mt-3 text-center text-sm font-semibold text-emerald-600">
            ✓ Status updated
          </p>
        )}
        {error && (
          <p className="mt-3 text-center text-sm font-semibold text-red-500">
            {error}
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

    </div>
  );
}

