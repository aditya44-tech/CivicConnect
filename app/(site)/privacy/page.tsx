import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — CivicConnect",
  description:
    "How CivicConnect collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy Policy"
      updated="August 16, 2026"
      intro="Your trust matters. This policy explains what information CivicConnect collects, why we collect it, and how we keep it safe."
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <>
              <p>
                <strong className="font-semibold text-gray-900">Account data:</strong> name, email address, and password (stored securely) when you create an account.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">Report data:</strong> photos, descriptions, and location information you submit with a complaint. This is public by design so neighbors and city crews can track progress.
              </p>
              <p>
                <strong className="font-semibold text-gray-900">Usage data:</strong> basic analytics like pages visited and device type, used to improve the service.
              </p>
            </>
          ),
        },
        {
          heading: "How We Use Your Information",
          body: (
            <>
              <p>
                We use your information to operate CivicConnect: authenticate
                you, display and route your reports, notify you of status
                changes, and improve the platform. We never sell your personal
                information.
              </p>
            </>
          ),
        },
        {
          heading: "Sharing",
          body: (
            <>
              <p>
                Your public reports (photos, description, location) are visible
                to anyone browsing the feed. We may share report data with city
                departments or contractors to help resolve issues. We don't
                share your private account data except as required by law.
              </p>
            </>
          ),
        },
        {
          heading: "Data Retention",
          body: (
            <>
              <p>
                We keep your account data as long as your account is active.
                Reports may be retained to preserve the public record, even
                after you delete your account.
              </p>
            </>
          ),
        },
        {
          heading: "Your Choices",
          body: (
            <>
              <p>
                You can review and update your account information at any time.
                You may delete your account or request removal of specific
                personal data by contacting us. Note that removing a report may
                not be possible once it's part of the public record.
              </p>
            </>
          ),
        },
        {
          heading: "Security",
          body: (
            <>
              <p>
                We use industry-standard safeguards — encryption in transit,
                hashed passwords, and least-privilege access — to protect your
                data. No method of transmission is 100% secure, but we work
                hard to keep your information safe.
              </p>
            </>
          ),
        },
        {
          heading: "Contact",
          body: (
            <>
              <p>
                Questions about your privacy? Reach us at{" "}
                <a
                  href="mailto:privacy@civicconnect.app"
                  className="font-medium text-gray-900 underline underline-offset-2"
                >
                  privacy@civicconnect.app
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
