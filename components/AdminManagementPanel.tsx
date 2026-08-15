"use client";

import { useState } from "react";
import type { Complaint, Status } from "@/lib/data";
import Button from "./Button";

export default function AdminManagementPanel({
  complaint,
}: {
  complaint: Complaint;
}) {
  const [status, setStatus] = useState<Status>(complaint.status);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="h-fit space-y-6 lg:sticky lg:top-8">
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

        <label className="mt-5 block">
          <span className="text-sm font-semibold text-gray-700">
            Resolution note
          </span>
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setSaved(false);
            }}
            rows={4}
            placeholder="What action was taken (or is planned)…"
            className="mt-2 w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
        </label>

        <Button className="mt-5 w-full" onClick={() => setSaved(true)}>
          Save changes
        </Button>
        {saved && (
          <p className="mt-3 text-center text-sm font-semibold text-green-600">
            Saved (demo)
          </p>
        )}
      </div>

      <div className="rounded-3xl bg-gray-50 p-6 ring-1 ring-gray-200/60">
        <h3 className="text-sm font-bold text-gray-900">Activity</h3>
        <ul className="mt-3 space-y-3 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            Reported {complaint.createdAt}
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            Assigned to Public Works on {complaint.createdAt}
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
            Last update: 2 days ago
          </li>
        </ul>
      </div>
    </div>
  );
}
