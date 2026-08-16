/**
 * Site Layout - Wraps all citizen-facing pages inside the (site) Route Group.
 * Injects the global Navbar and mobile BottomTabBar.
 */
import Navbar from "@/components/Navbar";
import BottomTabBar from "@/components/BottomTabBar";
import { getSessionUser } from "@/lib/auth";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getSessionUser();

  return (
    <div className="min-h-screen">
      <Navbar user={user} />
      <main className="pb-28 md:pb-20">{children}</main>
      <BottomTabBar />
    </div>
  );
}
