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
