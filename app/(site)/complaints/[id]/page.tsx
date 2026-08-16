import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import StatusTimeline from "@/components/StatusTimeline";
import UpvoteButton from "@/components/UpvoteButton";
import CommentsSection from "@/components/CommentsSection";
import Button from "@/components/Button";
import { ChevronRightIcon, MapPinIcon, PlusIcon } from "@/components/icons";
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
    <div className="min-h-screen">
      {/* Editorial Hero Area - Parallax sticky background */}
      <div className="sticky top-0 -z-10 h-[40vh] min-h-[320px] w-full overflow-hidden bg-surface-dark">
        <Image
          src={complaint.image}
          alt={complaint.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-overlay scale-105"
        />

        {/* Text container bound to the same max-width as the content below */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md ring-1 ring-white/25">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                {complaint.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md ring-1 ring-white/25">
                <span className={`h-1.5 w-1.5 rounded-full ${complaint.status === 'Pending' ? 'bg-amber-400' :
                    complaint.status === 'In Progress' ? 'bg-violet-400' :
                      'bg-emerald-400'
                  }`} />
                {complaint.status}
              </span>
            </div>

            <h1
              className="text-3xl font-black leading-[1.1] tracking-tighter text-white md:text-5xl lg:text-6xl max-w-[90%] line-clamp-2"
              title={complaint.title}
            >
              {complaint.title}
            </h1>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-gray-300">
              <MapPinIcon className="h-4 w-4" />
              <span>{complaint.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-canvas pb-20">
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
          <Link
            href="/feed"
            className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ChevronRightIcon className="h-4 w-4 rotate-180" />
            Back to feed
          </Link>

          {/* 2-Column Grid Layout */}
          <div className="grid gap-8 lg:grid-cols-3 xl:gap-12">

            {/* Left Column: Details, Timeline, Comments */}
            <div className="space-y-12 lg:col-span-2">

              {/* Details Section */}
              <section>
                <div className="flex items-center justify-between border-b border-hairline pb-5">
                  <h2 className="text-xl font-bold tracking-tight text-gray-900">Details</h2>
                  <UpvoteButton initial={complaint.upvotes} />
                </div>
                <p className="mt-6 text-base leading-relaxed text-gray-600">
                  {complaint.description}
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-soft text-sm font-bold text-gray-600">
                    {complaint.author.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reported by <span className="font-bold text-gray-900">{complaint.author}</span></p>
                    <p className="text-xs text-gray-400">{complaint.createdAt}</p>
                  </div>
                </div>
              </section>

              {/* Resolution Timeline */}
              <section className="rounded-2xl border border-hairline bg-surface-soft/50 p-6 sm:p-8">
                <h2 className="mb-8 text-lg font-bold tracking-tight text-gray-900">Resolution Timeline</h2>
                <StatusTimeline status={complaint.status} direction="vertical" />
              </section>

              {/* Comments */}
              <section>
                <CommentsSection initialComments={complaint.comments} />
              </section>
            </div>

            {/* Right Column: Location Card, CTA Card */}
            <div className="space-y-6">

              {/* Location Data Card - Flat design, no shadow */}
              <div className="overflow-hidden rounded-2xl border border-hairline bg-surface-card">
                <div className="bg-map-grid flex h-40 items-center justify-center border-b border-hairline">
                  <span className="rounded-full bg-surface-card p-3 ring-1 ring-hairline shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                    <MapPinIcon className="h-6 w-6 text-primary" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    Location Data
                  </h3>
                  <dl className="mt-5 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <dt className="text-gray-500">District</dt>
                      <dd className="font-semibold text-gray-900">North Ward</dd>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <dt className="text-gray-500">Coordinates</dt>
                      <dd className="font-mono text-xs font-semibold text-gray-700">40.7128° N, -74.0060° W</dd>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <dt className="text-gray-500">Category</dt>
                      <dd className="font-semibold text-gray-900">{complaint.category}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Similar Issue CTA Card */}
              <div className="rounded-2xl border border-surface-dark-elevated bg-surface-dark p-6 text-white">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">
                  Similar issue nearby?
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  Help keep our city clean and safe by reporting other issues in this area.
                </p>
                <Button
                  variant="secondary"
                  className="mt-6 w-full gap-2 border-white/20 bg-white/10 text-white hover:bg-white/20"
                >
                  <PlusIcon className="h-4 w-4" />
                  Report New Issue
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
