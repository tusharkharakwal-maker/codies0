import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = { title: "Privacy" };
export default function PrivacyPage() {
  return (
    <main id="main" className="privacy-page section-pad">
      <h1>
        YOUR DETAILS.
        <br />
        YOUR BUSINESS.
      </h1>
      <div>
        <h2>This is a concept website.</h2>
        <p>
          The contact form sends your entries to this website&apos;s own API for
          validation. The preview API does not store your brief or send email.
          Please use sample information while trying the form.
        </p>
        <h2>No tracking. No mailing list.</h2>
        <p>
          This project includes no analytics, advertising cookies, or marketing
          trackers. A session-storage flag remembers whether the opening
          animation has played. It expires when your browser session ends.
        </p>
        <h2>External links</h2>
        <p>
          Social links open each platform&apos;s homepage. Those sites have
          their own privacy policies. The studio email address is sample contact
          information.
        </p>
        <h2>Before launch</h2>
        <p>
          The site owner must replace this notice with a policy reflecting their
          actual business, hosting logs, email provider, and data retention
          practices before accepting real enquiries.
        </p>
        <Button href="/contact">Back to your brief</Button>
      </div>
    </main>
  );
}
