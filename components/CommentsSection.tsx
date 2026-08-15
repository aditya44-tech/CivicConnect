"use client";

import { useState } from "react";
import type { Comment } from "@/lib/data";
import Button from "./Button";

export default function CommentsSection({
  initialComments,
}: {
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [draft, setDraft] = useState("");

  const post = () => {
    const body = draft.trim();
    if (!body) return;
    setComments((prev) => [
      ...prev,
      { author: "You", body, time: "just now" },
    ]);
    setDraft("");
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
                {c.author
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
              <div className="min-w-0 flex-1 rounded-xl bg-gray-50 px-3.5 py-2.5">
                <p className="text-xs font-semibold text-gray-700">
                  {c.author}
                  <span className="ml-2 font-normal text-gray-400">{c.time}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {c.body}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
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
        <Button size="sm" onClick={post}>
          Post
        </Button>
      </div>
    </div>
  );
}
