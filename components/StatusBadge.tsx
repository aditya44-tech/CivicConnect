import type { Status } from "@/lib/data";

const styles: Record<Status, string> = {
  Pending:      "bg-status-pending/10 text-status-pending ring-1 ring-status-pending/30",
  "In Progress": "bg-surface-dark text-white ring-0",
  Resolved:     "bg-[#F0F0F0] text-[#6E6E73] ring-1 ring-[#E0E0E0]",
};

const dots: Record<Status, string> = {
  Pending:      "bg-status-pending",
  "In Progress": "bg-white",
  Resolved:     "bg-[#6E6E73]",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}
