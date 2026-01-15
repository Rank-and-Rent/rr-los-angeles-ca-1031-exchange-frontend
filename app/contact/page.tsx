"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FormEvent } from "react";
import { PHONE, EMAIL, ADDRESS } from "@/lib/constants";

declare global {
  interface Window {
    _turnstileLoaded?: boolean;
    _lastTurnstileToken?: string;
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string, options?: Record<string, unknown>) => Promise<string>;
      reset: (widgetId: string) => void;
    };
  }
}

// Custom SVG Icons
function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window._turnstileLoaded) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );
    if (existing) {
      window._turnstileLoaded = true;
      return resolve();
    }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => {
      window._turnstileLoaded = true;
      resolve();
    };
    s.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(s);
  });
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  city: string;
  property: string;
  estimatedCloseDate: string;
  company: string;
  timeline: string;
  message: string;
};

function ContactForm() {
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    city: "",
    property: "",
    estimatedCloseDate: "",
    company: "",
    timeline: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    let cancelled = false;
    const initTimeout = setTimeout(async () => {
      if (cancelled) return;
      if (!siteKey) return;

      try {
        await loadTurnstile();
        if (cancelled) return;

        if (!window.turnstile || !captchaRef.current) return;

        const id: string = window.turnstile.render(captchaRef.current, {
          sitekey: siteKey,
          size: "normal",
          callback: () => setTurnstileReady(true),
          "error-callback": () => setTurnstileReady(false),
          "timeout-callback": () => setTurnstileReady(false),
        });
        setTurnstileId(id);
        setTurnstileReady(true);
      } catch (error) {
        setTurnstileReady(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(initTimeout);
    };
  }, [siteKey]);

  useEffect(() => {
    if (window.location.hash === "#contact-form") {
      const contactForm = document.getElementById("contact-form");
      if (contactForm) {
        setTimeout(() => {
          contactForm.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.projectType.trim()) newErrors.projectType = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setFeedback("Please complete all required fields.");
      return;
    }

    setStatus("submitting");
    setErrors({});
    setFeedback("");

    try {
      if (siteKey && (!turnstileReady || !window.turnstile || !turnstileId)) {
        setFeedback("Please complete the security verification.");
        setStatus("error");
        return;
      }

      let turnstileToken = '';
      if (siteKey && window.turnstile && turnstileId) {
        try {
          window.turnstile.reset(turnstileId);
          turnstileToken = await new Promise<string>((resolve, reject) => {
            if (!window.turnstile) {
              reject(new Error("Turnstile not available"));
              return;
            }
            window.turnstile.execute(turnstileId, {
              async: true,
              action: "form_submit",
              callback: (t: string) => resolve(t),
              "error-callback": () => reject(new Error("turnstile-error")),
              "timeout-callback": () => reject(new Error("turnstile-timeout")),
            });
          });
        } catch (err) {
          setFeedback("Security verification failed. Please try again.");
          setStatus("error");
          if (window.turnstile && turnstileId) {
            window.turnstile.reset(turnstileId);
          }
          return;
        }
      }

      const phoneDigits = formData.phone.replace(/\D/g, '');

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: phoneDigits,
          projectType: formData.projectType,
          city: formData.city,
          property: formData.property,
          estimatedCloseDate: formData.estimatedCloseDate,
          company: formData.company,
          timeline: formData.timeline,
          details: formData.message,
          turnstileToken: turnstileToken,
        }),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          city: "",
          property: "",
          estimatedCloseDate: "",
          company: "",
          timeline: "",
          message: "",
        });
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
        setStatus("success");
        setFeedback("Thank you. A Los Angeles exchange specialist will follow up within one business day.");
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to submit form' }));
        setFeedback(errorData.error || 'Failed to submit form. Please try again.');
        setStatus("error");
        if (window.turnstile && turnstileId) {
          window.turnstile.reset(turnstileId);
        }
      }
    } catch (error) {
      setFeedback("An error occurred. Please try again or contact us directly.");
      setStatus("error");
      if (window.turnstile && turnstileId) {
        window.turnstile.reset(turnstileId);
      }
    }
  };


  return (
    <div className="bg-white pt-20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-navy">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="font-serif text-xl text-white/60 italic mb-6">
              Get Started
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-light tracking-wide mb-8">
              Contact Us
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              Ready to start your 1031 exchange? Our Los Angeles team specializes in connecting investors with compliant replacement properties across California.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              id="contact-form"
              className="bg-white p-10 md:p-12"
            >
              <h2 className="font-serif text-3xl text-navy mb-8">
                Start Your Exchange
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <fieldset disabled={status === "submitting"} className="space-y-8">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange("name")}
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none transition-colors text-lg bg-transparent"
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange("email")}
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none transition-colors text-lg bg-transparent"
                      />
                      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange("phone")}
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none transition-colors text-lg bg-transparent"
                      />
                      {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                        Company
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={handleChange("company")}
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none transition-colors text-lg bg-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                      Service *
                    </label>
                    <select
                      required
                      value={formData.projectType}
                      onChange={handleChange("projectType")}
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none bg-transparent text-lg"
                    >
                      <option value="">Select a service</option>
                      <option value="Forward Exchange">Forward Exchange</option>
                      <option value="Reverse Exchange">Reverse Exchange</option>
                      <option value="Qualified Intermediary Services">Qualified Intermediary Services</option>
                      <option value="Property Identification">Property Identification</option>
                      <option value="NNN Property Identification">NNN Property Identification</option>
                      <option value="Exchange Consultation">Exchange Consultation</option>
                      <option value="Form 8824 Preparation">Form 8824 Preparation</option>
                      <option value="Boot Analysis">Boot Analysis</option>
                    </select>
                    {errors.projectType && <p className="mt-2 text-sm text-red-600">{errors.projectType}</p>}
                  </div>

                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={handleChange("city")}
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none transition-colors text-lg bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                        Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={handleChange("timeline")}
                        className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none bg-transparent text-lg"
                      >
                        <option value="">Select timeline</option>
                        <option value="Immediate">Immediate</option>
                        <option value="45 days">45 days</option>
                        <option value="180 days">180 days</option>
                        <option value="Planning phase">Planning phase</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-[0.2em] uppercase text-gray-500 mb-3">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={handleChange("message")}
                      placeholder="Tell us about your exchange goals..."
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 focus:border-navy focus:ring-0 outline-none resize-none text-lg bg-transparent"
                    />
                  </div>

                  {siteKey && (
                    <div className="flex justify-center">
                      <div ref={captchaRef} className="min-h-[78px]" />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !!(siteKey && !turnstileReady)}
                    className="w-full py-5 bg-navy text-white font-sans text-sm tracking-[0.2em] uppercase hover:bg-navy-light transition-all disabled:opacity-50"
                  >
                    {status === "submitting" ? "Submitting..." : "Submit Request"}
                  </button>

                  <p className="text-xs text-gray-500 text-center">Educational content only. Not tax or legal advice.</p>

                  {feedback && (
                    <p className={`text-center text-sm font-medium ${status === "success" ? "text-green-700" : "text-red-600"}`}>
                      {feedback}
                    </p>
                  )}
                </fieldset>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Office Info */}
              <div className="bg-white p-10">
                <h3 className="font-serif text-2xl text-navy mb-8">
                  Los Angeles Office
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPinIcon className="w-5 h-5 text-navy mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-navy">1031 Exchange Los Angeles</p>
                      <p className="text-gray-600">{ADDRESS}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <PhoneIcon className="w-5 h-5 text-navy flex-shrink-0" />
                    <a href={`tel:${PHONE.replace(/\D/g, "")}`} className="text-gray-600 hover:text-navy transition-colors">
                      {PHONE}
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <MailIcon className="w-5 h-5 text-navy flex-shrink-0" />
                    <a href={`mailto:${EMAIL}`} className="text-gray-600 hover:text-navy transition-colors">
                      {EMAIL}
                    </a>
                  </div>

                  <div className="flex items-start gap-4">
                    <ClockIcon className="w-5 h-5 text-navy mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-navy">Hours</p>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM PT</p>
                      <p className="text-gray-600">24/7 emergency support available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-10">
                <h3 className="font-serif text-2xl text-navy mb-6">
                  Our Location
                </h3>
                <div className="aspect-video w-full overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.123456789!2d-118.25!3d34.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s722%20S%20Broadway%2C%20Los%20Angeles%2C%20CA%2090014!5e0!3m2!1sen!2sus!4v1703123456789!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="1031 Exchange Los Angeles Office Location"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white p-10">
                <h3 className="font-serif text-2xl text-navy mb-6">
                  Quick Links
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Link href="/services" className="text-gray-600 hover:text-navy transition-colors">
                    View All Services
                  </Link>
                  <Link href="/locations" className="text-gray-600 hover:text-navy transition-colors">
                    Explore Locations
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-navy transition-colors">
                    About Our Process
                  </Link>
                  <Link href="/blog" className="text-gray-600 hover:text-navy transition-colors">
                    1031 Exchange Blog
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-20 flex items-center justify-center">Loading...</div>}>
      <ContactForm />
    </Suspense>
  );
}
