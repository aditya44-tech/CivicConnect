"use client";

import { useState } from "react";
import { ThumbsUpIcon } from "./icons";

export default function UpvoteButton({
  complaintId,
  initial,
}: {
  complaintId: string;
  initial: number;
}) {
  const [upvoted, setUpvoted] = useState(false);
  const [count, setCount] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vote = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/complaints/${complaintId}/upvote`, {
        method: "POST",
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't update the vote.");
        return;
      }
      setUpvoted(data.upvoted);
      setCount(data.count);
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1.5">
      <button
        type="button"
        onClick={vote}
        disabled={busy}
        aria-pressed={upvoted}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-95 disabled:opacity-60 ${
          upvoted
            ? "bg-primary text-white shadow-[0_2px_8px_rgba(124,58,237,0.3)]"
            : "border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
        }`}
      >
        <ThumbsUpIcon
          key={upvoted ? "voted" : "unvoted"}
          className={`h-4 w-4 ${upvoted ? "animate-pop fill-current" : ""}`}
        />
        {count} {count === 1 ? "upvote" : "upvotes"}
      </button>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
