import AdminComplaintsTable from "@/components/AdminComplaintsTable";
import { getComplaints } from "@/lib/queries";

export const metadata = {
  title: "Complaints | Admin | CivicConnect",
};

export default async function AdminComplaintsPage() {
  const complaints = await getComplaints();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Complaints
      </h1>
      <p className="mt-1 text-gray-500">
        Review, triage, and manage every report.
      </p>

      <AdminComplaintsTable complaints={complaints} />
    </div>
  );
}
