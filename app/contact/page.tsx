"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import Head from "next/head";
import { BRAND_NAME, PHONE, EMAIL, PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";

const PROJECT_TYPES = [
  "Multifamily Property",
  "Commercial Retail",
  "Industrial Warehouse",
  "Medical Office",
  "Self Storage",
  "Hospitality",
  "Land Development",
  "Other"
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  timeline: string;
  details: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  timeline: "",
  details: "",
};

function ContactForm() {
  const searchParams = useSearchParams();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  // Handle URL parameters for prefill
  useEffect(() => {
    const projectType = searchParams.get("project_type");
    const location = searchParams.get("location");

    if (projectType) {
      setFormState(prev => ({ ...prev, projectType }));
    }

    if (location) {
      setFormState(prev => ({
        ...prev,
        details: prev.details ? `${prev.details}\n\nLocation of interest: ${location}` : `Location of interest: ${location}`
      }));
    }
  }, [searchParams]);

  const validateForm = (state: FormState): FormErrors => {
    const newErrors: FormErrors = {};
    if (!state.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }
    if (!state.email.trim()) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      newErrors.email = "Please enter a valid email format.";
    }
    if (!state.phone.trim()) {
      newErrors.phone = "Please provide a phone number.";
    }
    if (!state.projectType) {
      newErrors.projectType = "Please select a project type.";
    }
    if (!state.timeline) {
      newErrors.timeline = "Please select a timeline.";
    }
    if (!state.details.trim()) {
      newErrors.details = "Please provide details about your exchange goals.";
    }
    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const validationErrors = validateForm(formState);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      setStatusMessage("Please complete all required fields.");
      return;
    }

    try {
      setStatus("loading");
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setStatusMessage("Thank you for your inquiry. A member of our team will contact you within 24 hours.");
      setFormState(initialFormState);
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage("There was an issue sending your message. Please try again or call us directly.");
    }
  };

  const handleInputChange = (field: keyof FormState, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <Head>
        <title>Contact {BRAND_NAME} | Los Angeles CA 1031 Exchange Support</title>
        <meta
          name="description"
          content={`Contact ${BRAND_NAME} for expert 1031 exchange guidance in Los Angeles CA. Schedule a consultation for property identification, timeline management, and compliance support.`}
        />
        <meta
          name="keywords"
          content="contact, 1031 exchange, Los Angeles CA, consultation, property replacement"
        />
        <link rel="canonical" href="https://www.1031exchangela.com/contact" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">
                Contact Us
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Start Your Los Angeles CA 1031 Exchange
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Schedule a confidential consultation with our Los Angeles CA specialists.
                We&apos;ll help you navigate the 1031 exchange process and connect you with qualified professionals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <div className="bg-slate-800 rounded-xl p-8">
                  <h2 className="font-serif text-2xl text-white mb-6">
                    Request Consultation
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        label="Name"
                        id="name"
                        type="text"
                        value={formState.name}
                        onChange={(value) => handleInputChange("name", value)}
                        error={errors.name}
                        required
                        autoComplete="name"
                      />

                      <FormField
                        label="Company (Optional)"
                        id="company"
                        type="text"
                        value={formState.company}
                        onChange={(value) => handleInputChange("company", value)}
                        autoComplete="organization"
                      />
                    </div>

                    <FormField
                      label="Email"
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(value) => handleInputChange("email", value)}
                      error={errors.email}
                      required
                      autoComplete="email"
                    />

                    <FormField
                      label="Phone"
                      id="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={(value) => handleInputChange("phone", value)}
                      error={errors.phone}
                      required
                      autoComplete="tel"
                    />

                    <FormField
                      label="Project Type"
                      id="projectType"
                      type="select"
                      value={formState.projectType}
                      onChange={(value) => handleInputChange("projectType", value)}
                      error={errors.projectType}
                      required
                      options={PROJECT_TYPES}
                    />

                    <FormField
                      label="Timeline"
                      id="timeline"
                      type="select"
                      value={formState.timeline}
                      onChange={(value) => handleInputChange("timeline", value)}
                      error={errors.timeline}
                      required
                      options={[
                        "Immediately (within 30 days)",
                        "Within 3 months",
                        "Within 6 months",
                        "6+ months",
                        "Just researching options"
                      ]}
                    />

                    <FormField
                      label="Project Details"
                      id="details"
                      type="textarea"
                      value={formState.details}
                      onChange={(value) => handleInputChange("details", value)}
                      error={errors.details}
                      required
                      rows={4}
                      helper="Describe your property being sold, budget range, and specific requirements."
                    />

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-amber-500 text-slate-900 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>

                    {statusMessage && (
                      <div className={`p-4 rounded-lg ${
                        status === "success"
                          ? "bg-green-500/10 border border-green-500/20 text-green-300"
                          : "bg-red-500/10 border border-red-500/20 text-red-300"
                      }`}>
                        {status === "success" && <CheckCircle className="h-5 w-5 inline mr-2" />}
                        {statusMessage}
                      </div>
                    )}

                    <p className="text-xs text-slate-400 text-center">
                      Educational content only. Not tax or legal advice.
                    </p>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info and Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2 space-y-8"
              >
                {/* Contact Information */}
                <div className="bg-slate-800 rounded-xl p-8">
                  <h3 className="font-serif text-xl text-white mb-6">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Phone</p>
                        <a
                          href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                          className="text-slate-300 hover:text-amber-400 transition-colors"
                        >
                          {PHONE}
                        </a>
                        <p className="text-sm text-slate-400 mt-1">Available 24/7 for urgent inquiries</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Email</p>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="text-slate-300 hover:text-amber-400 transition-colors"
                        >
                          {EMAIL}
                        </a>
                        <p className="text-sm text-slate-400 mt-1">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Office</p>
                        <p className="text-slate-300">
                          1010 Santa Monica Boulevard<br />
                          Suite 1600<br />
                          {PRIMARY_CITY} {PRIMARY_STATE_ABBR} 90067
                        </p>
                        <p className="text-sm text-slate-400 mt-1">By appointment only</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Hours</p>
                        <p className="text-slate-300">Monday - Friday: 8:00 AM - 6:00 PM PT</p>
                        <p className="text-slate-300">Emergency Support: 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-slate-800 rounded-xl overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOMLD0kFq5n8w&q=1010+Santa+Monica+Boulevard+${PRIMARY_CITY}+${PRIMARY_STATE_ABBR}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${BRAND_NAME} Office Location`}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                  <h4 className="font-serif text-lg text-white mb-3">
                    Why Contact Us?
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Local Los Angeles CA market expertise</li>
                    <li>• Network of qualified intermediaries</li>
                    <li>• Timeline management and compliance support</li>
                    <li>• Property identification assistance</li>
                    <li>• Free initial consultation</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact {BRAND_NAME} | Los Angeles CA 1031 Exchange Support</title>
        <meta
          name="description"
          content={`Contact ${BRAND_NAME} for expert 1031 exchange guidance in Los Angeles CA. Schedule a consultation for property identification, timeline management, and compliance support.`}
        />
        <meta
          name="keywords"
          content="contact, 1031 exchange, Los Angeles CA, consultation, property replacement"
        />
        <link rel="canonical" href="https://www.1031exchangela.com/contact" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100 pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="bg-slate-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400 mb-4">
                Contact Us
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Start Your Los Angeles CA 1031 Exchange
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8">
                Schedule a confidential consultation with our Los Angeles CA specialists.
                We&apos;ll help you navigate the 1031 exchange process and connect you with qualified professionals.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="bg-slate-900 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <ContactForm />
                </Suspense>
              </motion.div>

              {/* Contact Info and Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2 space-y-8"
              >
                {/* Contact Information */}
                <div className="bg-slate-800 rounded-xl p-8">
                  <h3 className="font-serif text-2xl text-white mb-6">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Phone</p>
                        <a
                          href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                          className="text-slate-300 hover:text-amber-400 transition-colors"
                        >
                          {PHONE}
                        </a>
                        <p className="text-sm text-slate-400 mt-1">Available 24/7 for urgent inquiries</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Email</p>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="text-slate-300 hover:text-amber-400 transition-colors"
                        >
                          {EMAIL}
                        </a>
                        <p className="text-sm text-slate-400 mt-1">Response within 24 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Office</p>
                        <p className="text-slate-300">
                          1010 Santa Monica Boulevard<br />
                          Suite 1600<br />
                          {PRIMARY_CITY} {PRIMARY_STATE_ABBR} 90067
                        </p>
                        <p className="text-sm text-slate-400 mt-1">By appointment only</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Hours</p>
                        <p className="text-slate-300">Monday - Friday: 8:00 AM - 6:00 PM PT</p>
                        <p className="text-slate-300">Emergency Support: 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-slate-800 rounded-xl overflow-hidden">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dOMLD0kFq5n8w&q=1010+Santa+Monica+Boulevard+${PRIMARY_CITY}+${PRIMARY_STATE_ABBR}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${BRAND_NAME} Office Location`}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                  <h4 className="font-serif text-lg text-white mb-3">
                    Why Contact Us?
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Local Los Angeles CA market expertise</li>
                    <li>• Network of qualified intermediaries</li>
                    <li>• Timeline management and compliance support</li>
                    <li>• Property identification assistance</li>
                    <li>• Free initial consultation</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function FormField({
  label,
  id,
  type,
  value,
  onChange,
  error,
  required,
  autoComplete,
  options,
  rows,
  helper
}: {
  label: string;
  id: keyof FormState;
  type: "text" | "email" | "tel" | "select" | "textarea";
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  options?: string[];
  rows?: number;
  helper?: string;
}) {
  const inputClasses = "w-full px-4 py-3 bg-slate-900/60 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors";
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const describedBy = `${error ? errorId : ""}${helper ? ` ${helperId}` : ""}`.trim();

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-slate-200 mb-2">
        {label}
        {required && <span className="text-amber-400 ml-1">*</span>}
      </label>

      {type === "select" ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={inputClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        >
          <option value="">Select an option</option>
          {options?.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 3}
          required={required}
          autoComplete={autoComplete}
          className={`${inputClasses} resize-none`}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          className={inputClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
        />
      )}

      {helper && (
        <p id={helperId} className="mt-2 text-xs text-slate-400">
          {helper}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
