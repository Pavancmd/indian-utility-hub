import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Last updated: October 7, 2026
            </p>
          </div>

          <div className="mt-8 space-y-8 text-sm leading-7 text-slate-600">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                1. Introduction
              </h2>

              <p className="mt-3">
                Welcome to Indian Utility Hub. We respect your privacy and are
                committed to being transparent about how information may be
                collected and used when you visit and use our website.
              </p>

              <p className="mt-3">
                This Privacy Policy explains the general practices of Indian
                Utility Hub regarding information, cookies, analytics,
                advertising and third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                2. Information We Collect
              </h2>

              <p className="mt-3">
                Indian Utility Hub is designed so that many of its tools can
                be used without creating an account or providing personal
                information.
              </p>

              <p className="mt-3">
                Depending on how you use the website, limited technical or
                usage information may be collected automatically by the
                website, analytics providers, advertising partners or other
                third-party services.
              </p>

              <p className="mt-3">
                Examples may include browser type, device information,
                approximate location, pages visited, referring pages and
                general usage information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                3. Information Entered Into Tools
              </h2>

              <p className="mt-3">
                Many calculators and utility tools operate directly in your
                browser. Information entered into these tools may be processed
                locally on your device and is not automatically associated with
                a user account.
              </p>

              <p className="mt-3">
                However, certain features or future services may use external
                processing or third-party services. Where applicable, the
                relevant tool or service may provide additional information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                4. Cookies
              </h2>

              <p className="mt-3">
                Indian Utility Hub or third-party services used on the website
                may use cookies or similar technologies to provide, maintain,
                analyze or improve website functionality.
              </p>

              <p className="mt-3">
                Cookies may also be used by advertising and analytics providers
                to understand website usage and deliver or measure
                advertisements.
              </p>

              <p className="mt-3">
                You can manage or disable cookies through your browser
                settings. Disabling certain cookies may affect some website
                functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                5. Google AdSense and Advertising
              </h2>

              <p className="mt-3">
                Indian Utility Hub may use Google AdSense or other advertising
                services to display advertisements on the website.
              </p>

              <p className="mt-3">
                Advertising providers may use cookies and similar technologies
                to serve, personalize, measure or improve advertisements based
                on applicable policies and user settings.
              </p>

              <p className="mt-3">
                Google may use advertising cookies to help display ads based on
                a user's visits to this website and other websites. Users may
                be able to manage advertising preferences through Google's
                available advertising controls.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                6. Analytics
              </h2>

              <p className="mt-3">
                We may use analytics services to understand how visitors use
                Indian Utility Hub, identify technical issues and improve the
                website.
              </p>

              <p className="mt-3">
                Analytics services may collect information such as pages
                visited, device information, browser information, approximate
                location and interaction data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                7. Third-Party Services
              </h2>

              <p className="mt-3">
                The website may contain or use third-party services, links,
                advertisements, analytics tools or other integrations.
              </p>

              <p className="mt-3">
                Third-party services operate according to their own privacy
                policies and terms. Indian Utility Hub is not responsible for
                the privacy practices of external websites or services that are
                not controlled by us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                8. Data Security
              </h2>

              <p className="mt-3">
                We take reasonable steps to help protect information associated
                with the website. However, no method of transmission or
                electronic storage can be guaranteed to be completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                9. Children's Privacy
              </h2>

              <p className="mt-3">
                Indian Utility Hub is intended to provide general-purpose
                utility tools. We do not knowingly request personal information
                from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                10. External Links
              </h2>

              <p className="mt-3">
                Indian Utility Hub may contain links to external websites.
                Visiting an external website is subject to that website's own
                privacy policy and terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                11. Changes to This Privacy Policy
              </h2>

              <p className="mt-3">
                We may update this Privacy Policy from time to time to reflect
                changes to the website, services, legal requirements or
                advertising and analytics practices.
              </p>

              <p className="mt-3">
                Any updated version will be published on this page with a
                revised "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                12. Contact Us
              </h2>

              <p className="mt-3">
                If you have questions, concerns or requests regarding this
                Privacy Policy, you can contact us through the Contact Us page
                on Indian Utility Hub.
              </p>
            </section>

            <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-semibold text-slate-950">
                Important note
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                This Privacy Policy is provided as a general website policy
                template and should be reviewed and adapted to the actual
                services, analytics tools, advertising providers, cookies and
                data practices used by Indian Utility Hub before publication.
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