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
          ? "bg-primary text-white shadow-md shadow-primary/30"
          : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      }`}
    >
      <ThumbsUpIcon className="h-4 w-4" />
      {count} {count === 1 ? "upvote" : "upvotes"}
    </button>
  );
}
