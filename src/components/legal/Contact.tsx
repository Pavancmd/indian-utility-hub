import {
  ArrowLeft,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";

export default function Contact() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "/";
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const mailSubject = subject || "Contact from Indian Utility Hub";

    const mailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const mailtoUrl =
      `mailto:contact@indianutilityhub.com` +
      `?subject=${encodeURIComponent(mailSubject)}` +
      `&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

      {/* Main */}
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-slate-500">
            GET IN TOUCH
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Contact Us
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
            Have a question, suggestion, feedback or found an issue?
            We would love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Information */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                <Mail size={20} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-950">
                Email us
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                For general questions, feedback, suggestions or website
                related concerns, you can contact us by email.
              </p>

              <a
                href="mailto:contact@indianutilityhub.com"
                className="mt-4 inline-flex text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:decoration-slate-900"
              >
                contact@indianutilityhub.com
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                <MessageSquare size={20} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-slate-950">
                What can you contact us about?
              </h2>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-500">
                <li>• Website feedback and suggestions</li>
                <li>• Reporting a technical issue</li>
                <li>• Questions about our tools</li>
                <li>• Privacy-related questions</li>
                <li>• Business or partnership enquiries</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white">
              <h2 className="text-base font-semibold">
                Before contacting us
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Please include enough information about your question or issue
                so we can understand and respond to it clearly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-semibold text-slate-950">
                Send us a message
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill in the form below. Your default email application will
                open when you submit the form.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What is this about?"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-800"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={7}
                  placeholder="Write your message here..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
              >
                <Send size={17} />
                Send Message
              </button>
            </form>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              Submitting this form opens your default email application.
              Your message is not sent directly by this website.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6 lg:px-8">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Indian Utility Hub. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}