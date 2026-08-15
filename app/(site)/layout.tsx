/**
 * Site Layout - Wraps all citizen-facing pages inside the (site) Route Group.
 * Injects the global Navbar and mobile BottomTabBar.
 */
import Navbar from "@/components/Navbar";
import BottomTabBar from "@/components/BottomTabBar";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pb-28 md:pb-20">{children}</main>
      <BottomTabBar />
    </div>
  );
}
