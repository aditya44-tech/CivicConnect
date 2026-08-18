import Link from "next/link";
import Button from "@/components/Button";
import ComplaintCard from "@/components/ComplaintCard";
import DeleteComplaintButton from "@/components/DeleteComplaintButton";
import { getComplaintsByAuthor } from "@/lib/queries";
import { requireUser } from "@/lib/auth";
import { PlusIcon } from "@/components/icons";

export const metadata = {
  title: "My Complaints | CivicConnect",
  description: "Track the reports you've submitted to CivicConnect.",
};

export default async function MyComplaintsPage() {
  const user = await requireUser();
  const mine = await getComplaintsByAuthor(user.id);
  const pending = mine.filter((c) => c.status === "Pending").length;
  const inProgress = mine.filter((c) => c.status === "Ongoing").length;
  const resolved = mine.filter((c) => c.status === "Resolved").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 pb-24 sm:px-6 sm:pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            My Complaints
          </h1>
          <p className="mt-1 text-gray-500">
            {mine.length} report{mine.length === 1 ? "" : "s"} submitted by you.
          </p>
        </div>
        <Button>
          <Link href="/submit" className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            New Complaint
          </Link>
        </Button>
      </div>

      {/* Personal Stats Bar */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Pending", count: pending, color: "text-status-pending", bg: "bg-status-pending/10 ring-status-pending/20" },
          { label: "Ongoing", count: inProgress, color: "text-primary", bg: "bg-primary/10 ring-primary/20" },
          { label: "Resolved", count: resolved, color: "text-status-resolved", bg: "bg-status-resolved/10 ring-status-resolved/20" },
        ].map(({ label, count, color, bg }) => (
          <div key={label} className="rounded-2xl bg-surface-card p-4 ring-1 ring-hairline shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <p className={`text-2xl font-black ${color}`}>{count}</p>
            <p className="mt-1 text-xs font-semibold text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {mine.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-hairline bg-surface-card p-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft">
            <PlusIcon className="h-7 w-7 text-primary" />
          </div>
          <p className="text-base font-bold text-gray-900">No complaints yet</p>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            You haven&apos;t filed any reports yet. Spot something broken in your city? It only takes 60 seconds.
          </p>
          <Button className="mt-6">
            <Link href="/submit">File your first report</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mine.map((c) => (
            <div key={c.id} className="relative">
              <ComplaintCard complaint={c} />
              <div className="absolute right-3 top-3 z-10">
                <DeleteComplaintButton
                  complaintId={c.id}
                  className="bg-black/50 text-white backdrop-blur-sm hover:bg-red-600"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
