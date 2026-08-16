"use client";

import { useState } from "react";
import type { Comment } from "@/lib/data";
import Button from "./Button";
import { ShieldCheckIcon } from "./icons";

interface AdminComment extends Comment {
  isOfficial?: boolean;
}

// Detect known official authors from the seed data
function isOfficialAuthor(author: string): boolean {
  const officials = [
    "Shirpur Public Works",
    "Public Works",
    "Shirpur Parks Dept.",
    "Waste Management",
    "Traffic Signals Unit",
    "Drainage Dept.",
    "J. Okafor",
    "City Admin",
    "Shirpur City Officials",
  ];
  return officials.some((o) =>
    author.toLowerCase().includes(o.toLowerCase())
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AdminCommentsSection({
  complaintId,
  initialComments,
}: {
  complaintId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<AdminComment[]>(
    initialComments.map((c) => ({
      ...c,
      isOfficial: isOfficialAuthor(c.author),
    }))
  );
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = async () => {
    const body = draft.trim();
    if (!body || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/complaints/${complaintId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't post the comment.");
        return;
      }
      setComments((prev) => [
        ...prev,
        { ...data.comment, isOfficial: true },
      ]);
      setDraft("");
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">
          Comments
          <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
            {comments.length}
          </span>
        </h2>
      </div>

      {/* Comment list */}
      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="rounded-2xl bg-gray-50 px-5 py-4 text-sm text-gray-500">
            No comments yet.
          </p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[11px] font-bold text-gray-600">
                {initials(c.author)}
              </span>
              <div className="min-w-0 flex-1 rounded-2xl bg-gray-50 px-4 py-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                  {c.author}
                  {c.isOfficial && (
                    <span className="flex items-center gap-0.5 text-gray-900" title="Verified Official">
                      <ShieldCheckIcon className="h-3.5 w-3.5" />
                    </span>
                  )}
                  <span className="ml-1.5 font-normal text-gray-400">{c.time}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {c.body}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}
      {/* Compose box — posts as official */}
      <div className="mt-5 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") post();
          }}
          placeholder="Add an official comment…"
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
        />
        <Button size="sm" onClick={post} disabled={busy}>
          {busy ? "Posting…" : "Post"}
        </Button>
      </div>
    </div>
  );
}
