import Link from "next/link";
import { notFound } from "next/navigation";
import AdminManagementPanel from "@/components/AdminManagementPanel";
import StatusBadge from "@/components/StatusBadge";
import StatusTimeline from "@/components/StatusTimeline";
import AdminCommentsSection from "@/components/AdminCommentsSection";
import { ChevronRightIcon, MapPinIcon } from "@/components/icons";
import { complaints } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return complaints.map((c) => ({ id: c.id }));
}

export default async function AdminComplaintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const complaint = complaints.find((c) => c.id === id);
  if (!complaint) notFound();

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
        {/* Left column: complaint card + timeline + comments */}
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
          <AdminCommentsSection initialComments={complaint.comments} />
        </div>

        <AdminManagementPanel complaint={complaint} />
      </div>
    </div>
  );
}
