import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import StatusTimeline from "@/components/StatusTimeline";
import UpvoteButton from "@/components/UpvoteButton";
import CommentsSection from "@/components/CommentsSection";
import { ChevronRightIcon, MapPinIcon } from "@/components/icons";
import { complaints } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return complaints.map((c) => ({ id: c.id }));
}

export default async function ComplaintDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const complaint = complaints.find((c) => c.id === id);
  if (!complaint) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/feed"
        className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900"
      >
        <ChevronRightIcon className="h-4 w-4 rotate-180" />
        Back to feed
      </Link>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={complaint.image}
        alt={complaint.title}
        className="mt-5 aspect-[16/9] w-full rounded-3xl object-cover shadow-sm ring-1 ring-gray-200/70"
      />

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <StatusBadge status={complaint.status} />
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          {complaint.category}
        </span>
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900">
        {complaint.title}
      </h1>

      <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <MapPinIcon className="h-4 w-4" />
          {complaint.address}
        </span>
        <span>Reported {complaint.createdAt}</span>
        <span>by {complaint.author}</span>
      </p>

      <div className="mt-6 flex items-center gap-3">
        <UpvoteButton initial={complaint.upvotes} />
      </div>

      <p className="mt-6 leading-relaxed text-gray-600">
        {complaint.description}
      </p>

      {/* Status timeline */}
      <div className="mt-8 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
        <h2 className="text-lg font-bold text-gray-900">Status</h2>
        <div className="mt-6">
          <StatusTimeline status={complaint.status} />
        </div>
      </div>

      {/* Map preview */}
      <div className="mt-6 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-gray-200/70">
        <h2 className="text-lg font-bold text-gray-900">Location</h2>
        <div className="bg-map-grid relative mt-4 h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-soft via-white to-accent-orange/20">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg">
            <MapPinIcon className="h-6 w-6 text-primary-dark" />
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-600 backdrop-blur-md">
            Map preview
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-500">{complaint.address}</p>
      </div>

      {/* Comments */}
      <div className="mt-6">
        <CommentsSection initialComments={complaint.comments} />
      </div>
    </div>
  );
}
