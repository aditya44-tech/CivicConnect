import Link from "next/link";
import Image from "next/image";
import type { Complaint } from "@/lib/data";
import StatusBadge from "./StatusBadge";
import { MapPinIcon, ThumbsUpIcon } from "./icons";

export default function ComplaintCard({ complaint }: { complaint: Complaint }) {
  return (
    <Link
      href={`/complaints/${complaint.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface-card shadow-[0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-hairline transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:ring-black/[0.08]"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
        <Image
          src={complaint.image}
          alt={complaint.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        {/* Dark gradient overlay for better badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {complaint.category}
        </span>
        <span className="absolute right-3 top-3">
          <StatusBadge status={complaint.status} />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-gray-900 tracking-tight group-hover:text-primary transition-colors duration-200">
          {complaint.title}
        </h3>
        <p className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          <span className="truncate">{complaint.address}</span>
        </p>
        {/* Flexible spacer: cards with short content grow to match the row;
            cards with full content are unaffected and keep their natural height */}
        <div className="flex-1" />
        <div className="mt-3 flex items-center justify-between border-t border-hairline pt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5 font-bold text-gray-700">
            <ThumbsUpIcon className="h-3.5 w-3.5 text-primary" />
            {complaint.upvotes}
          </span>
          <span className="text-[11px]">{complaint.createdAt}</span>
        </div>
      </div>
    </Link>
  );
}
