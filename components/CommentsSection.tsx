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
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200/70">
      <h2 className="text-lg font-bold text-gray-900">
        Comments{" "}
        <span className="text-sm font-semibold text-gray-400">
          {comments.length}
        </span>
      </h2>
      <div className="mt-4 space-y-4">
        {comments.length === 0 ? (
          <p className="rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-500">
            No comments yet. Be the first to weigh in.
          </p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold text-primary-dark">
                {c.author
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {c.author}{" "}
                  <span className="ml-1 text-xs font-normal text-gray-400">
                    {c.time}
                  </span>
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-gray-600">
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
