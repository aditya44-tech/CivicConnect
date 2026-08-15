"use client";

import { useState } from "react";
import { ThumbsUpIcon } from "./icons";

export default function UpvoteButton({ initial }: { initial: number }) {
  const [upvoted, setUpvoted] = useState(false);
  const [count, setCount] = useState(initial);

  return (
    <button
      type="button"
      onClick={() => {
        const next = !upvoted;
        setUpvoted(next);
        setCount((c) => c + (next ? 1 : -1));
      }}
      aria-pressed={upvoted}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${
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
  );
}
