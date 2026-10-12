import { ArrowLeft } from "lucide-react";

export default function Terms() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="text-sm font-bold tracking-tight text-slate-950 transition hover:text-slate-700"
          >
            Indian Utility Hub
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="border-b border-slate-200 pb-8">
            <p className="text-sm font-semibold text-slate-500">
              LEGAL INFORMATION
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Terms & Conditions
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Last updated: October 7, 2026
            </p>
          </div>

          <div className="mt-8 space-y-8 text-sm leading-7 text-slate-600">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                1. Acceptance of Terms
              </h2>

              <p className="mt-3">
                By accessing or using Indian Utility Hub, you agree to be
                bound by these Terms & Conditions. If you do not agree with
                these terms, please do not use the website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                2. About Indian Utility Hub
              </h2>

              <p className="mt-3">
                Indian Utility Hub provides general-purpose online utility
                tools including calculators, converters, image utilities,
                document utilities and other practical tools.
              </p>

              <p className="mt-3">
                The website may add, remove, modify or discontinue tools and
                features from time to time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                3. Use of the Website
              </h2>

              <p className="mt-3">
                You agree to use Indian Utility Hub only for lawful purposes
                and in a manner that does not interfere with the operation,
                security or availability of the website.
              </p>

              <p className="mt-3">
                You must not attempt to gain unauthorized access to the
                website, its systems or services, or intentionally introduce
                malicious software or harmful code.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                4. Calculator and Tool Results
              </h2>

              <p className="mt-3">
                The tools provided on Indian Utility Hub are intended for
                general informational and practical purposes.
              </p>

              <p className="mt-3">
                Although reasonable care is taken to provide useful and
                accurate calculations, we do not guarantee that every result
                will always be complete, accurate, current or suitable for a
                particular purpose.
              </p>

              <p className="mt-3">
                You should independently verify important results before
                relying on them for financial, academic, health, legal,
                business or other important decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                5. Financial Information
              </h2>

              <p className="mt-3">
                Financial calculators available on the website are provided
                for general informational purposes only.
              </p>

              <p className="mt-3">
                Results from tools such as EMI, percentage or GST calculators
                should not be considered financial, tax, accounting or
                investment advice.
              </p>

              <p className="mt-3">
                Always verify important financial information with a qualified
                professional or the relevant official source before making a
                financial decision.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                6. Health Information
              </h2>

              <p className="mt-3">
                Health-related tools, including BMI calculations, are provided
                for general informational purposes only.
              </p>

              <p className="mt-3">
                Results should not be treated as medical advice, diagnosis or
                treatment. Consult a qualified healthcare professional for
                personal medical guidance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                7. Uploaded Files
              </h2>

              <p className="mt-3">
                Certain tools may allow you to upload images or documents for
                processing.
              </p>

              <p className="mt-3">
                You are responsible for ensuring that you have the necessary
                rights and permissions to use any files you upload.
              </p>

              <p className="mt-3">
                Do not upload files containing sensitive or confidential
                information unless you understand the applicable processing
                and privacy implications of the particular tool.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                8. Intellectual Property
              </h2>

              <p className="mt-3">
                Unless otherwise stated, the website design, branding, text,
                graphics, logos, code and other original materials associated
                with Indian Utility Hub are protected by applicable
                intellectual property laws.
              </p>

              <p className="mt-3">
                You may use the website for personal and lawful purposes, but
                you may not reproduce, redistribute, modify or commercially
                exploit website content without appropriate permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                9. Third-Party Services and Links
              </h2>

              <p className="mt-3">
                Indian Utility Hub may use third-party services or contain
                links to external websites.
              </p>

              <p className="mt-3">
                We do not control external websites and are not responsible
                for their content, availability, security, privacy practices
                or terms.
              </p>

              <p className="mt-3">
                Your use of third-party services is subject to the applicable
                third party's own terms and policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                10. Advertising
              </h2>

              <p className="mt-3">
                Indian Utility Hub may display advertisements from third-party
                advertising providers, including Google AdSense or other
                advertising services.
              </p>

              <p className="mt-3">
                Advertisements may be selected, served or measured using
                technologies such as cookies in accordance with applicable
                advertising policies and user settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                11. Availability of the Website
              </h2>

              <p className="mt-3">
                We aim to keep Indian Utility Hub available and functional,
                but we do not guarantee uninterrupted, error-free or
                permanently available access to the website.
              </p>

              <p className="mt-3">
                The website or individual tools may occasionally be unavailable
                because of maintenance, technical problems, updates or other
                circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                12. Limitation of Liability
              </h2>

              <p className="mt-3">
                To the extent permitted by applicable law, Indian Utility Hub
                shall not be responsible for losses, damages or consequences
                arising from reliance on information, calculations, tools,
                content or services provided through the website.
              </p>

              <p className="mt-3">
                You use the website and its tools at your own discretion and
                risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                13. Changes to These Terms
              </h2>

              <p className="mt-3">
                We may update these Terms & Conditions from time to time.
                Changes will become effective when the updated terms are
                published on this page.
              </p>

              <p className="mt-3">
                Continued use of Indian Utility Hub after an update means that
                you accept the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                14. Contact
              </h2>

              <p className="mt-3">
                If you have questions about these Terms & Conditions, you can
                contact us through the Contact Us page on Indian Utility Hub.
              </p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-semibold text-slate-950">
                Important note
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                These Terms & Conditions are provided as a general website
                terms template. They should be reviewed and adapted to the
                actual services, business structure, jurisdiction and
                practices of Indian Utility Hub before final publication.
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-6 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Indian Utility Hub. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}