import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — CivicConnect",
  description:
    "The terms that govern your use of CivicConnect, the city complaint and resolution tracking platform.",
};

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms of Service"
      updated="August 16, 2026"
      intro="These terms govern your use of CivicConnect. By creating an account or submitting a report, you agree to them. If you don't agree, please don't use the service."
      sections={[
        {
          heading: "The Service",
          body: (
            <>
              <p>
                CivicConnect lets you report issues in your city, track their
                status, and follow resolutions. We provide the platform as-is
                and make no guarantee that any particular report will be
                resolved.
              </p>
            </>
          ),
        },
        {
          heading: "Your Account",
          body: (
            <>
              <p>
                You're responsible for keeping your login credentials secure and
                for everything that happens under your account. You must be at
                least 13 years old to use CivicConnect.
              </p>
            </>
          ),
        },
        {
          heading: "User Content",
          body: (
            <>
              <p>
                You keep ownership of the reports and photos you submit, but
                you grant CivicConnect a license to store, display, and share
                them so the service can work. Don't post content that is
                unlawful, harassing, or reveals someone else's private
                information.
              </p>
            </>
          ),
        },
        {
          heading: "Acceptable Use",
          body: (
            <>
              <p>
                Don't misuse the platform: no spam, no fake or duplicate reports intended to mislead, no attempts to disrupt the service, and no scraping of data at scale without permission.
              </p>
            </>
          ),
        },
        {
          heading: "Termination",
          body: (
            <>
              <p>
                We may suspend or terminate accounts that violate these terms.
                You can delete your account at any time; reports you've made
                may remain visible to maintain the public record.
              </p>
            </>
          ),
        },
        {
          heading: "Liability",
          body: (
            <>
              <p>
                CivicConnect is provided &ldquo;as is&rdquo; without warranties
                of any kind. To the fullest extent permitted by law, we aren't
                liable for damages arising from your use of the service,
                including reliance on the status of any report.
              </p>
            </>
          ),
        },
        {
          heading: "Changes",
          body: (
            <>
              <p>
                We may update these terms from time to time. Material changes
                will be reflected here with a new &ldquo;last updated&rdquo;
                date, and continued use of the service means you accept them.
              </p>
            </>
          ),
        },
        {
          heading: "Contact",
          body: (
            <>
              <p>
                Questions about these terms? Reach us at{" "}
                <a
                  href="mailto:legal@civicconnect.app"
                  className="font-medium text-gray-900 underline underline-offset-2"
                >
                  legal@civicconnect.app
                </a>
                .
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
