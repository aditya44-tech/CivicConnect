import FeedClient from "@/components/FeedClient";
import { getComplaints } from "@/lib/queries";

export const metadata = {
  title: "Community Feed — CivicConnect",
  description:
    "Browse reported issues in your neighborhood and track their resolution progress.",
};

export default async function FeedPage() {
  const complaints = await getComplaints();
  return <FeedClient initialComplaints={complaints} />;
}
