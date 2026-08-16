import type { ReactNode } from "react";

interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  kicker: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

/**
 * Shared layout for legal / policy pages (Terms, Privacy).
 * Renders a metadata kicker, title, last-updated line, intro, and sections.
 */
export default function LegalPage({
  kicker,
  title,
  updated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
        {kicker}
      </p>
      <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
        {title}
      </h1>
      <p className="mt-3 text-sm font-medium text-gray-400">
        Last updated {updated}
      </p>
      <p className="mt-8 text-lg leading-relaxed text-gray-600">{intro}</p>

      <div className="mt-10 space-y-10">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-lg font-bold text-gray-900">
              {i + 1}. {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray-500">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
