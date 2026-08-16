"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@/components/icons";

interface Props {
  complaintId: string;
  /** Text shown next to the icon (omit for a compact icon-only button). */
  label?: string;
  /** Navigate here after a successful delete (e.g. /feed). */
  redirectTo?: string;
  /** Extra classes for the button. */
  className?: string;
}

export default function DeleteComplaintButton({
  complaintId,
  label,
  redirectTo,
  className = "",
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    if (!window.confirm("Delete this complaint? This can't be undone.")) return;

    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/complaints/${complaintId}`, {
        method: "DELETE",
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't delete the complaint.");
        return;
      }
      if (redirectTo) {
        router.push(redirectTo);
        router.refresh();
      } else {
        router.refresh();
      }
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  };

  const base =
    "inline-flex items-center gap-1.5 rounded-full font-semibold transition-all duration-150 active:scale-95 disabled:opacity-60";
  const classes = label
    ? `${base} px-4 py-2 text-sm ${className}`
    : `${base} p-2 ${className}`;

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={busy}
        aria-label={label ? undefined : "Delete complaint"}
        title={label ? undefined : "Delete complaint"}
        className={classes}
      >
        <TrashIcon className="h-4 w-4" />
        {label && (busy ? "Deleting…" : label)}
      </button>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </span>
  );
}
