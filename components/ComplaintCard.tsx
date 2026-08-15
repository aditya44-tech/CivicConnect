import Link from "next/link";
import type { Complaint } from "@/lib/data";
import StatusBadge from "./StatusBadge";
import { MapPinIcon, ThumbsUpIcon } from "./icons";

export default function ComplaintCard({ complaint }: { complaint: Complaint }) {
  return (
    <Link
      href={`/complaints/${complaint.id}`}
      className="group block overflow-hidden rounded-3xl bg-white p-3 shadow-sm ring-1 ring-gray-200/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-200"
    >
      <div className="relative overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={complaint.image}
          alt={complaint.title}
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-700 backdrop-blur-md">
          {complaint.category}
        </span>
        <span className="absolute right-3 top-3">
          <StatusBadge status={complaint.status} />
        </span>
      </div>
      <div className="px-2 pb-2 pt-3">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-gray-900">
          {complaint.title}
        </h3>
        <p className="mt-1.5 flex items-center gap-1 text-xs text-gray-500">
          <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{complaint.address}</span>
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5 font-medium text-gray-700">
            <ThumbsUpIcon className="h-3.5 w-3.5" />
            {complaint.upvotes}
          </span>
          <span>{complaint.createdAt}</span>
        </div>
      </div>
    </Link>
  );
}
