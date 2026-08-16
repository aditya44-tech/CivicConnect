import Link from "next/link";
import { notFound } from "next/navigation";
import AdminManagementPanel from "@/components/AdminManagementPanel";
import StatusBadge from "@/components/StatusBadge";
import AdminCommentsSection from "@/components/AdminCommentsSection";
import DeleteComplaintButton from "@/components/DeleteComplaintButton";
import MapView from "@/components/MapView";
import { ChevronRightIcon, MapPinIcon } from "@/components/icons";
import { getComplaintById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminComplaintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const complaint = await getComplaintById(id);
  if (!complaint) notFound();

  const hasCoords =
    typeof complaint.latitude === "number" && typeof complaint.longitude === "number";

  return (
    <div>
      <Link
        href="/admin/complaints"
        className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-gray-900"
      >
        <ChevronRightIcon className="h-4 w-4 rotate-180" />
        Back to complaints
      </Link>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem]">
        {/* Left column: complaint card + comments */}
        <div className="space-y-6">
          {/* Complaint summary */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={complaint.image}
              alt={complaint.title}
              className="aspect-[16/8] w-full object-cover"
            />
            <div className="p-7">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={complaint.status} />
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {complaint.category}
                </span>
                <DeleteComplaintButton
                  complaintId={complaint.id}
                  redirectTo="/admin/complaints"
                  className="ml-auto -mr-1 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600"
                />
              </div>
              <h1 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-900">
                {complaint.title}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4" />
                  {complaint.address}
                </span>
                <span>Reported {complaint.createdAt}</span>
                <span>by {complaint.author}</span>
                <span>{complaint.upvotes} upvotes</span>
              </p>
              <p className="mt-5 leading-relaxed text-gray-600">
                {complaint.description}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <AdminCommentsSection complaintId={complaint.id} initialComments={complaint.comments} />
        </div>

        <div className="space-y-6">
          <AdminManagementPanel complaintId={complaint.id} complaint={complaint} />
          {/* Map showing where the issue is */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-200/70">
            <div className="flex items-center justify-between p-5 pb-0">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                Issue Location
              </h3>
              {hasCoords && (
                <a
                  href={`https://www.google.com/maps?q=${complaint.latitude},${complaint.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
                >
                  <MapPinIcon className="h-3.5 w-3.5" />
                  Open in Google Maps
                </a>
              )}
            </div>
            <div className="p-5">
              <MapView
                latitude={complaint.latitude}
                longitude={complaint.longitude}
                height="h-64"
                interactive
              />
              {/* Address + coordinates under the map */}
              <div className="mt-4 space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                  <span className="leading-snug font-semibold text-gray-900">
                    {complaint.address}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-3.5 py-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    Coordinates
                  </span>
                  {hasCoords ? (
                    <span className="font-mono text-xs font-semibold text-gray-700">
                      {complaint.latitude!.toFixed(6)}, {complaint.longitude!.toFixed(6)}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-gray-400">Not detected</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
