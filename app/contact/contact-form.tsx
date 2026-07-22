"use client";

import { Suspense } from "react";

function ContactForm() {
  return (
    <div id="contact-form" className="border border-white/10 bg-navy/50 p-8">
      <form className="space-y-6" data-type="contact-form" action="/api/contact" method="post">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">
            Name <span className="text-cream">*</span>
          </label>
          <input
            id="contact-name"
            type="text" name="name"
            autoComplete="name"
            required
            className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 transition-colors focus:border-cream focus:outline-none"
            placeholder="Your name"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="contact-phone" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">
              Phone Number <span className="text-cream">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel" name="phone"
              autoComplete="tel"
              required
              className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 transition-colors focus:border-cream focus:outline-none"
              placeholder="(555) 555-5555"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">
              Email <span className="text-cream">*</span>
            </label>
            <input
              id="contact-email"
              type="email" name="email"
              autoComplete="email"
              required
              className="w-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 transition-colors focus:border-cream focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-3 border border-white/20 px-4 py-4 text-sm text-white/80 transition-colors hover:border-cream">
          <input type="hidden" name="hasCompleted1031" value="No" />
          <input
            type="checkbox"
            name="hasCompleted1031"
            value="Yes"
            className="h-4 w-4 shrink-0 accent-cream"
          />
          Have you completed a 1031 exchange before?
        </label>

        <div>
          <label htmlFor="contact-Have you completed a 1031 exchange before?" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">
            Notes
          </label>
          <textarea id="contact-notes"
            className="w-full resize-none border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 transition-colors focus:border-cream focus:outline-none" name="notes" rows={4} placeholder="Share any exchange questions or context"></textarea>
        </div>
<div>
          <label htmlFor="contact-notes" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">
            Have you completed a 1031 exchange before?
          </label>
          <select id="contact-notes"
            className="w-full resize-none border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder-white/40 transition-colors focus:border-cream focus:outline-none" name="hasCompleted1031" required><option value="">Select yes or no</option><option value="Yes">Yes</option><option value="No">No</option></select>
        </div>

        <button
          type="submit"
          className="w-full border border-cream bg-cream px-8 py-4 text-sm font-medium uppercase tracking-widest text-navy-dark transition-all duration-300 hover:bg-white"
        >
          Submit Exchange Inquiry
        </button>
        <p className="text-center text-xs text-white/40">Educational content only. Not tax or legal advice.</p>
      </form>
    </div>
  );
}

export function ContactFormWrapper() {
  return (
    <Suspense fallback={<div className="border border-white/10 bg-navy/50 p-8 text-white/60">Loading form...</div>}>
      <ContactForm />
    </Suspense>
  );
}
