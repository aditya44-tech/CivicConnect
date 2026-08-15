import Link from "next/link";
import Button from "@/components/Button";
import ComplaintCard from "@/components/ComplaintCard";
import { complaints } from "@/lib/data";

export default function MyComplaintsPage() {
  const mine = complaints.filter((c) => c.isMine);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My complaints
          </h1>
          <p className="mt-1 text-gray-500">
            {mine.length} report{mine.length === 1 ? "" : "s"} submitted by you.
          </p>
        </div>
        <Button>
          <Link href="/submit">New complaint</Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {mine.map((c) => (
          <ComplaintCard key={c.id} complaint={c} />
        ))}
      </div>
    </div>
  );
}
