import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CivicConnect — Report it. Track it. Get it fixed.",
  description:
    "CivicConnect is a city complaint & resolution tracking platform. Report an issue, follow its progress, and see your neighborhood get better.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
