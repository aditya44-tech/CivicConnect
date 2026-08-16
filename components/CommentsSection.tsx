"use client";

import { useState } from "react";
import type { Comment } from "@/lib/data";
import Button from "./Button";
import { ShieldCheckIcon } from "./icons";

interface PublicComment extends Comment {
  isOfficial?: boolean;
}

// Official authors from the seed data / admin comments
function isOfficialAuthor(author: string): boolean {
  const officials = [
    "Shirpur Public Works",
    "Public Works",
    "Shirpur Parks Dept.",
    "Waste Management",
    "Traffic Signals Unit",
    "Drainage Dept.",
    "Shirpur City Officials",
    "City Admin",
  ];
  return officials.some((o) => author.toLowerCase().includes(o.toLowerCase()));
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function CommentsSection({
  complaintId,
  initialComments,
}: {
  complaintId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<PublicComment[]>(
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
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't post the comment.");
        return;
      }
      setComments((prev) => [
        ...prev,
        { ...data.comment, isOfficial: isOfficialAuthor(data.comment.author) },
      ]);
      setDraft("");
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.07)] ring-1 ring-black/[0.04]">
      <h2 className="text-base font-bold text-gray-900">
        Comments{" "}
        <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
          {comments.length}
        </span>
      </h2>
      <div className="mt-5 space-y-5">
        {comments.length === 0 ? (
          <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
            No comments yet. Be the first to weigh in.
          </p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[11px] font-bold text-primary-dark">
                {initials(c.author)}
              </span>
              <div className="min-w-0 flex-1 rounded-xl bg-gray-50 px-3.5 py-2.5">
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
      {error && <p className="mt-3 text-sm font-medium text-red-500">{error}</p>}
      <div className="mt-5 flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") post();
          }}
          placeholder="Add a comment…"
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/10"
        />
        <Button size="sm" onClick={post} disabled={busy}>
          Post
        </Button>
      </div>
    </div>
  );
}
