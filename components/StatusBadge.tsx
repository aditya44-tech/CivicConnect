import type { Status } from "@/lib/data";

const styles: Record<Status, string> = {
  Pending: "bg-amber-100 text-amber-800",
  "In Progress": "bg-primary-soft text-primary-dark",
  Resolved: "bg-green-100 text-green-700",
};

const dots: Record<Status, string> = {
  Pending: "bg-amber-500",
  "In Progress": "bg-primary",
  Resolved: "bg-green-500",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}
