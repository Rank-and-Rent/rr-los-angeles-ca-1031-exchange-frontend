"use client";

import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState, useMemo } from "react";
import SearchInput from "@/components/SearchInput";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  CalendarDays,
  CheckCircle,
  Building,
  ClipboardList,
  Clock,
  FileText,
  Gavel,
  Info,
  Landmark,
  Layers,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { servicesData, propertyTypesData, locationsData } from "@/data";


const PHONE = "213-555-1031";
const BRAND_NAME = "1031 Exchange Los Angeles";
const PRIMARY_BRAND_COLOR = "#0f2d4c";
const ACCENT_COLOR = "#f5b544";
const HAS_STAFFED_OFFICE = true;

type Service = { title: string; description: string; href: string };
type PropertyType = { title: string; benefit: string; href: string };
type CityItem = { name: string; description: string; slug: string };
type FAQ = { question: string; answer: string };

// Map servicesData to the expected format for the home page
const SERVICES: readonly Service[] = servicesData
  .filter(service => ['timelines', 'structures', 'execution'].includes(service.category))
  .slice(0, 5)
  .map(service => ({
    title: service.name,
    description: service.short,
    href: `/services/${service.route}`,
  }));

// Map propertyTypesData to the expected format for the home page
const PROPERTY_TYPES: readonly PropertyType[] = propertyTypesData
  .slice(0, 6)
  .map(propertyType => {
    const benefitMap: Record<string, string> = {
      multifamily: "Preserve rental income streams while repositioning into stabilized or value-add apartment assets.",
      "triple-net-retail": "Exchange into long-term net lease credit tenants to reduce hands-on management obligations.",
      "industrial-flex": "Capture logistics growth with build-to-suit warehouses and adaptive reuse flex properties.",
      "medical-office": "Align with healthcare operator demand while maintaining like-kind commercial status and stable leases.",
      "dst-tic": "Access institutional fractional portfolios while complying with IRS revenue rulings for passive investors.",
      "self-storage": "Own recession-resistant self-storage assets with consistent demand and automated operations.",
    };

    return {
      title: propertyType.name,
      benefit: benefitMap[propertyType.slug] || "Strategic property investment opportunity for 1031 exchange investors.",
      href: `/property-types/${propertyType.route}`,
    };
  });

// Map locationsData to the expected format for the home page
const CA_CITIES_SLUGS: readonly CityItem[] = locationsData
  .slice(0, 6)
  .map(location => {
    const descriptionMap: Record<string, string> = {
      "downtown-los-angeles": "Exchange support for adaptive reuse towers, mixed-use redevelopments, and Opportunity Zone parcels.",
      "santa-monica": "Coastal advisory for hospitality, retail, and multifamily repositioning along the Silicon Beach corridor.",
      "pasadena": "Historic district compliance with attorney partnerships for legacy wealth transitions.",
      "west-hollywood": "Guidance for boutique hospitality and creative office reinvestments with tight deadline management.",
      "long-beach": "Port-adjacent logistics exchanges and mixed-use waterfront developments across Los Angeles County.",
      "glendale": "Investor services for corporate headquarters relocations and Class A office dispositions.",
      "beverly-hills": "Luxury retail and office properties with high-net-worth investor focus.",
      "century-city": "Corporate headquarters and medical office properties in the heart of LA's business district.",
    };

    return {
      name: location.name,
      description: descriptionMap[location.slug] || `${location.type} properties available for 1031 exchange in ${location.name}.`,
      slug: location.route,
    };
  });

const FAQ_ITEMS: readonly FAQ[] = [
  {
    question: "What are the 45 and 180 day rules?",
    answer:
      "The IRS requires identification of replacement property within 45 calendar days of the relinquished property closing and completion of the acquisition within 180 calendar days or the due date of the tax return, whichever occurs first. Missing either deadline disqualifies the exchange.",
  },
  {
    question: "What qualifies as like-kind property?",
    answer:
      "Real property held for productive use in a trade or business or for investment qualifies as like-kind to other real property of the same class. Personal property and primary residences do not qualify. California conforms to the federal like-kind definition for real property.",
  },
  {
    question: "What is boot and how is it taxed?",
    answer:
      "Boot is any cash, debt relief, or non-like-kind property received during the exchange. Boot is taxable to the extent of realized gain. Careful contract structuring and intermediary controls help reduce or eliminate boot.",
  },
  {
    question: "How are transfer taxes handled in California?",
    answer:
      "Documentary transfer taxes in Los Angeles County and statewide transfer taxes remain due and payable during a 1031 exchange. These taxes are not deferred by the exchange structure and must be budgeted at closing.",
  },
  {
    question: "Can I perform a reverse exchange?",
    answer:
      "A reverse exchange allows acquisition of the replacement property before the relinquished sale. It requires a qualified exchange accommodation arrangement and strict compliance with IRS Rev. Proc. 2000-37 and related guidance.",
  },
  {
    question: "How do I report the exchange on IRS Form 8824?",
    answer:
      "Report the exchange on IRS Form 8824 for the tax year in which the relinquished property transfers. Include California adjustments on the state return and maintain supporting documentation for audit review.",
  },
];

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: "https://www.1031exchangela.com/",
  logo: "https://www.1031exchangela.com/og-image.png",
  telephone: "+1-213-555-1031",
  address: HAS_STAFFED_OFFICE
    ? {
        "@type": "PostalAddress",
        streetAddress: "1010 Santa Monica Boulevard Suite 1600",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        postalCode: "90067",
        addressCountry: "US",
      }
    : {
        "@type": "PostalAddress",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        addressCountry: "US",
      },
  sameAs: [
    "https://www.linkedin.com/company/pacific-equity-1031-advisors",
    "https://www.avvo.com/",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-213-555-1031",
      contactType: "customer service",
      areaServed: ["US-CA", "US-CA-Los Angeles"],
      availableLanguage: ["English"],
    },
  ],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "1031 Exchange Los Angeles",
  url: "https://www.1031exchangela.com/",
  potentialAction: {
    "@type": "SearchAction",
    target:
      "https://www.1031exchangela.com/search?query={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  property: string;
  estimatedCloseDate: string;
  city: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  property: "",
  estimatedCloseDate: "",
  city: "",
  message: "",
};

const heroBackgroundStyle = {
  backgroundImage:
    "linear-gradient(140deg, rgba(15,45,76,0.96) 0%, rgba(15,45,76,0.82) 40%, rgba(245,181,68,0.28) 100%)",
};

const overlayStyle = {
  backgroundImage:
    "radial-gradient(circle at 20% 20%, rgba(245,181,68,0.18), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.14), transparent 45%)",
};

const glassPanelStyle = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))",
  borderColor: "rgba(255,255,255,0.18)",
  backdropFilter: "blur(14px)",
} as const;

// Removed cardMotion to fix SSR hydration issues

export default function Page(): JSX.Element {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [locationSearchQuery] = useState("");

  const heroCityNames = useMemo(
    () => CA_CITIES_SLUGS.map((city) => city.name).join(" • "),
    [],
  );

  const filteredCities = useMemo(() => {
    if (!locationSearchQuery.trim()) return CA_CITIES_SLUGS;
    return CA_CITIES_SLUGS.filter(city =>
      city.name.toLowerCase().includes(locationSearchQuery.toLowerCase()) ||
      city.description.toLowerCase().includes(locationSearchQuery.toLowerCase())
    );
  }, [locationSearchQuery]);

  const validateForm = (state: FormState): FormErrors => {
    const newErrors: FormErrors = {};
    if (!state.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }
    if (!state.email.trim()) {
      newErrors.email = "Please enter a valid email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim())) {
      newErrors.email = "The email format appears incorrect.";
    }
    if (!state.phone.trim()) {
      newErrors.phone = "Please provide a phone number with area code.";
    }
    if (!state.property.trim()) {
      newErrors.property = "Describe the property you plan to sell.";
    }
    if (!state.estimatedCloseDate.trim()) {
      newErrors.estimatedCloseDate = "Select the anticipated closing date.";
    }
    if (!state.city.trim()) {
      newErrors.city = "List the city where the property is located.";
    }
    if (!state.message.trim()) {
      newErrors.message = "Explain your exchange goals or any questions.";
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
      setStatusMessage(
        "Please resolve the highlighted items to submit your request.",
      );
      return;
    }
    try {
      setStatus("loading");
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!response.ok) {
        throw new Error("Submission failed");
      }
      setStatus("success");
      setStatusMessage(
        "Thank you. A member of 1031 Exchange Los Angeles will follow up shortly.",
      );
      setFormState(initialFormState);
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage(
        "There was an issue sending your details. Please retry or call our office.",
      );
    }
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.1031exchangela.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_SCHEMA),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(FAQ_SCHEMA),
          }}
        />
      </Head>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="relative overflow-hidden mt-16 md:mt-20" style={heroBackgroundStyle}>
          <div
            className="pointer-events-none absolute inset-0 opacity-100"
            style={overlayStyle}
          />
          <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-12"
            >
              <div className="flex flex-col gap-8 md:gap-10">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-200">
                    Pacific Equity
                  </p>
                  <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
                    Los Angeles 1031 Exchange Experts
                  </h1>
                  <p className="mt-6 text-lg leading-relaxed text-slate-100/90 md:text-xl">
                    Strategic guidance for California investors managing proceeds, identifying replacement property within 45 days, and closing inside the 180 day IRS deadline with documented compliance at every step.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-base font-medium shadow-lg transition-transform focus-visible:ring-2 focus-visible:ring-slate-50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    style={{
                      backgroundColor: ACCENT_COLOR,
                      color: PRIMARY_BRAND_COLOR,
                    }}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call {PHONE}
                  </motion.a>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="#lead-form"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3 text-base font-medium text-white transition focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent hover:border-white/60 hover:bg-white/5"
                    >
                      Start My Exchange
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </motion.div>
                </div>
              </div>
              <div
                className="rounded-3xl border px-6 py-6 shadow-lg md:px-8 md:py-7"
                style={glassPanelStyle}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-3 text-sm text-white/85">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/60">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      Deadline Assurance
                    </div>
                    <p className="text-base text-white/90">
                      45 Day identification. 180 Day closing. We help you stay compliant.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 text-sm text-white/75 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-center">
                      CPA Alliance
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-center">
                      Attorney Partners
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-center">
                      Qualified Intermediary Network
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/30">
                {heroCityNames}
              </p>
            </motion.div>
          </div>
        </header>

        <main>
          <section className="bg-slate-950 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mx-auto flex max-w-3xl flex-col gap-4 text-center"
            >
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                  Why Choose {BRAND_NAME}
                </p>
                <h2 className="font-serif text-3xl text-white md:text-4xl">
                  Precision exchange guidance grounded in California law, timeline discipline, and escrow transparency.
                </h2>
                <p className="text-base leading-relaxed text-slate-300">
                  We align investors, intermediaries, counsel, and title teams across Los Angeles County to preserve tax deferral and maintain audit-ready documentation.
                </p>
              </motion.div>
              <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    title: "California and Los Angeles County Expertise",
                    description:
                      "Local zoning nuance, transfer tax planning, and market knowledge aligned with California Franchise Tax Board conformity.",
                    icon: Landmark,
                  },
                  {
                    title: "Attorney and CPA Coordination",
                    description:
                      "Project manage legal and tax advisors with secure data rooms and scheduled review checkpoints.",
                    icon: Gavel,
                  },
                  {
                    title: "Qualified Intermediary Network",
                    description:
                      "Pair your exchange with bonded intermediaries that operate segregated trust accounts and fidelity insurance.",
                    icon: ShieldCheck,
                  },
                  {
                    title: "IRS-Compliant Escrow Workflow",
                    description:
                      "Implement assignment documentation, replacement property vesting, and escrow disbursement controls.",
                    icon: FileText,
                  },
                  {
                    title: "Timeline and Audit Discipline",
                    description:
                      "Document every milestone with time-stamped notices, acknowledgement logs, and 8824-ready summaries.",
                    icon: ClipboardList,
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="rounded-2xl border border-slate-800/70 bg-slate-900/50 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                    whileHover={{ y: -6 }}
                  >
                    <item.icon
                      className="h-10 w-10"
                      style={{ color: ACCENT_COLOR }}
                      aria-hidden="true"
                    />
                    <h3 className="mt-6 font-serif text-xl text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-6 md:px-8 md:py-7">
                <p className="text-sm text-slate-300">
                  A 1031 exchange defers federal and California income tax on qualifying real property. It does not remove transfer or documentary taxes in Los Angeles County. Review the{" "}
                  <Link
                    href="https://ttc.lacounty.gov/documentary-transfer-tax/"
                    className="text-slate-100 underline decoration-2 underline-offset-4"
                  >
                    Los Angeles County documentary transfer tax guidance
                  </Link>{" "}
                  and the{" "}
                  <Link
                    href="https://www.boe.ca.gov/proptaxes/transfer.htm"
                    className="text-slate-100 underline decoration-2 underline-offset-4"
                  >
                    California statewide transfer tax overview
                  </Link>{" "}
                  before closing.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
              >
                <div className="max-w-2xl">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                    How a 1031 Works
                  </p>
                  <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                    Sequence the exchange with disciplined logistics and formal documentation.
                  </h2>
                </div>
                <div className="flex gap-4 text-sm text-slate-300">
                  <Link
                    href="https://www.irs.gov/forms-pubs/about-form-8824"
                    className="inline-flex items-center gap-2 underline decoration-2 underline-offset-4 hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    IRS Form 8824
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href="https://www.irs.gov/tax-professionals/like-kind-exchanges-under-irc-code-section-1031"
                    className="inline-flex items-center gap-2 underline decoration-2 underline-offset-4 hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    Like-Kind Property Rules
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "Sell the relinquished property",
                    description:
                      "Initiate the exchange before closing. Assign rights to the qualified intermediary and escrow instructions prior to funding.",
                    icon: CheckCircle,
                  },
                  {
                    title: "Identify within 45 days",
                    description:
                      "Submit written identification of up to three properties or follow the 200 percent rule with acknowledgements retained.",
                    icon: Clock,
                  },
                  {
                    title: "Close within 180 days",
                    description:
                      "Complete acquisition by day 180 or the tax filing deadline. Ensure vesting, debt replacement, and escrow disbursements align.",
                    icon: Layers,
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-sm"
                  >
                    <item.icon
                      className="h-9 w-9"
                      style={{ color: ACCENT_COLOR }}
                      aria-hidden="true"
                    />
                    <h3 className="mt-5 font-serif text-xl text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-6 md:px-8 md:py-7">
                <p className="text-sm text-slate-300">
                  Vacation rentals and mixed-use personal residences require special handling. Review{" "}
                  <Link
                    href="https://www.irs.gov/irb/2008-16_IRB#RP-2008-16"
                    className="text-slate-100 underline decoration-2 underline-offset-4"
                  >
                    Rev. Proc. 2008-16
                  </Link>{" "}
                  to align personal use limits with IRS safe harbor provisions.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-950 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                  Services Preview
                </p>
                <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                  Advisory, escrow coordination, and compliance management engineered for complex California exchanges.
                </h2>
              </motion.div>
              <div className="mt-14 grid gap-8 md:grid-cols-2">
                {SERVICES.map((service) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-xl text-white">
                        {service.title}
                      </h3>
                      <ArrowRight className="h-5 w-5 text-slate-500" aria-hidden="true" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-100 underline decoration-2 underline-offset-4 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      View service detail
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10">
                <Link
                  href="/services/"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  See all services
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                  Property Types
                </p>
                <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                  Evaluate each asset class for risk, financing, and operational demands before submitting your identification list.
                </h2>
              </motion.div>
              <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {PROPERTY_TYPES.map((property) => (
                  <motion.div
                    key={property.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="rounded-2xl border border-slate-800 bg-slate-900/70 p-7 shadow transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <Layers
                      className="h-8 w-8"
                      style={{ color: ACCENT_COLOR }}
                      aria-hidden="true"
                    />
                    <h3 className="mt-5 font-serif text-lg text-white">
                      {property.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">
                      {property.benefit}
                    </p>
                    <Link
                      href={property.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-100 underline decoration-2 underline-offset-4 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10">
                <Link
                  href="/property-types/"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Explore property types
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="bg-slate-950 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                  Los Angeles Coverage
                </p>
                <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                  Advisory reach across every Los Angeles County submarket with coordinated statewide support.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-300">
                  {BRAND_NAME} guides exchanges from Westside luxury dispositions to industrial repositioning throughout the Inland Empire. Our qualified intermediary network spans California for investors executing multi-county rollovers.
                </p>

                {/* Location Search */}
                <div className="mt-6 max-w-md">
                  <SearchInput
                    placeholder="Search Los Angeles areas..."
                    items={CA_CITIES_SLUGS.map(city => ({
                      title: city.name,
                      slug: city.slug,
                      description: city.description,
                      href: `/locations/${city.slug}`,
                    }))}
                    onNoResults={(query) => {
                      window.location.href = `/contact?project_type=Other&location=${encodeURIComponent(query)}`;
                    }}
                  />
                </div>
              </motion.div>
              <div className="mt-14 grid gap-8 md:grid-cols-2">
                {filteredCities.length > 0 ? filteredCities.map((city) => (
                  <motion.div
                    key={city.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="mt-1 h-5 w-5"
                        style={{ color: ACCENT_COLOR }}
                        aria-hidden="true"
                      />
                      <div>
                        <h3 className="font-serif text-lg text-white">
                          {city.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-300">
                          {city.description}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Link
                        href={`/locations/${city.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-100 underline decoration-2 underline-offset-4 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                      >
                        View location detail
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.div>
                )) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="col-span-full text-center py-12"
                  >
                    <div className="max-w-md mx-auto">
                      <MapPin className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <h3 className="font-serif text-xl text-white mb-2">
                        No areas found
                      </h3>
                      <p className="text-slate-400 mb-6">
                        We couldn&apos;t find &quot;{locationSearchQuery}&quot; in Los Angeles CA, but we serve many other areas.
                      </p>
                      <Link
                        href={`/contact?project_type=Other&location=${encodeURIComponent(locationSearchQuery)}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-900 rounded-lg font-medium hover:bg-amber-600 transition-colors"
                      >
                        Contact for Other Areas
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/locations/"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  See locations
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <p className="text-sm text-slate-400">
                  Service available statewide, including Orange County, San Diego County, and Northern California exchanges.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-900 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid gap-8 md:grid-cols-2"
              >
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow transition hover:-translate-y-1 hover:shadow-lg">
                  <Calculator
                    className="h-10 w-10"
                    style={{ color: ACCENT_COLOR }}
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 font-serif text-2xl text-white">
                    Capital Gains Estimator
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Forecast federal and California capital gains exposure, depreciation recapture, and potential boot to guide reinvestment targets.
                  </p>
                  <Link
                    href="/resources/calculator"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    Launch estimator
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow transition hover:-translate-y-1 hover:shadow-lg">
                  <CalendarDays
                    className="h-10 w-10"
                    style={{ color: ACCENT_COLOR }}
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 font-serif text-2xl text-white">
                    Timeline Reminders
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Automate milestone alerts, document acknowledgements, and team coordination for every exchange deadline.
                  </p>
                  <Link
                    href="/resources/timeline"
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm font-medium text-slate-100 hover:bg-slate-800/60 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    View reminders
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="bg-slate-950 py-20 md:py-28">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">
                  Clear explanations for investors, attorneys, and advisors navigating California 1031 exchanges.
                </h2>
              </motion.div>
              <div className="mt-12 divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900/60">
                {FAQ_ITEMS.map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="p-8"
                  >
                    <div className="flex items-start gap-4">
                      <InfoBadge />
                      <div>
                        <h3 className="font-serif text-xl text-white">
                          {faq.question}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                    {index < FAQ_ITEMS.length - 1 && (
                      <div className="mt-8 h-px bg-slate-800/80" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="lead-form"
            className="bg-slate-900 py-20 md:py-28"
            aria-labelledby="lead-form-title"
          >
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid gap-12 lg:grid-cols-2"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                    Start the Conversation
                  </p>
                  <h2
                    id="lead-form-title"
                    className="mt-3 font-serif text-3xl text-white md:text-4xl"
                  >
                    Request a confidential consultation to map your Los Angeles 1031 exchange.
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-300">
                    Submit your property timeline and we will coordinate a call covering intermediary selection, financing, and closing logistics. Urgent deadlines receive same-day scheduling.
                  </p>
                  <div className="mt-8 flex flex-col gap-4 text-sm text-slate-300">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-slate-400" aria-hidden="true" />
                      <span>Call us at {PHONE}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-slate-400" aria-hidden="true" />
                      <span>
                        Service area: Los Angeles County, Orange County, San Diego County, San Francisco Bay Area
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-slate-400" aria-hidden="true" />
                      <span>Complimentary timeline outline with every consultation</span>
                    </div>
                  </div>
                </div>

                <motion.form
                  onSubmit={handleSubmit}
                  method="post"
                  action="/api/lead"
                  noValidate
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8 shadow-lg"
                >
                  <div className="grid gap-6">
                    <FormField
                      label="Name"
                      id="name"
                      type="text"
                      autoComplete="name"
                      value={formState.name}
                      onChange={(value) =>
                        setFormState((prev) => ({ ...prev, name: value }))
                      }
                      error={errors.name}
                      required
                    />
                    <FormField
                      label="Email"
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={formState.email}
                      onChange={(value) =>
                        setFormState((prev) => ({ ...prev, email: value }))
                      }
                      error={errors.email}
                      required
                    />
                    <FormField
                      label="Phone"
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formState.phone}
                      onChange={(value) =>
                        setFormState((prev) => ({ ...prev, phone: value }))
                      }
                      error={errors.phone}
                      required
                    />
                    <FormField
                      label="Property Being Sold"
                      id="property"
                      type="text"
                      autoComplete="organization-title"
                      value={formState.property}
                      onChange={(value) =>
                        setFormState((prev) => ({ ...prev, property: value }))
                      }
                      error={errors.property}
                      required
                    />
                    <FormField
                      label="Estimated Close Date"
                      id="estimatedCloseDate"
                      type="date"
                      value={formState.estimatedCloseDate}
                      onChange={(value) =>
                        setFormState((prev) => ({
                          ...prev,
                          estimatedCloseDate: value,
                        }))
                      }
                      error={errors.estimatedCloseDate}
                      required
                    />
                    <FormField
                      label="City"
                      id="city"
                      type="text"
                      autoComplete="address-level2"
                      value={formState.city}
                      onChange={(value) =>
                        setFormState((prev) => ({ ...prev, city: value }))
                      }
                      error={errors.city}
                      required
                    />
                    <FormField
                      label="Message"
                      id="message"
                      type="textarea"
                      value={formState.message}
                      onChange={(value) =>
                        setFormState((prev) => ({ ...prev, message: value }))
                      }
                      error={errors.message}
                      required
                      helper="Share exchange goals, debt profile, or special instructions."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold focus-visible:ring-2 focus-visible:ring-slate-50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    style={{
                      backgroundColor: ACCENT_COLOR,
                      color: PRIMARY_BRAND_COLOR,
                    }}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Submitting..." : "Submit Request"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </motion.button>
                  <p className="mt-4 text-xs text-slate-400" id="form-compliance">
                    Educational content only. Not tax or legal advice.
                  </p>
                  <div className="mt-4 text-sm" role="status" aria-live="polite">
                    {statusMessage && (
                      <p
                        className={
                          status === "success" ? "text-emerald-300" : "text-amber-300"
                        }
                      >
                        {statusMessage}
                      </p>
                    )}
                  </div>
                </motion.form>
              </motion.div>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-900/60 bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
            <div className="grid gap-12 md:grid-cols-4">
              <div className="flex flex-col gap-4">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                  {BRAND_NAME}
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  Trusted 1031 exchange support for Los Angeles investors, advisors, and property owners seeking precise compliance and confident reinvestment.
                </p>
                <Link
                  href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-100 hover:text-white focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {PHONE}
                </Link>
                {HAS_STAFFED_OFFICE ? (
                  <div className="text-sm text-slate-400">
                    <p>1010 Santa Monica Boulevard Suite 1600</p>
                    <p>Los Angeles, CA 90067</p>
                    <p>Monday to Friday, 8:00 AM to 6:00 PM PT</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">
                    Remote advisory team with on-site coverage across California by appointment.
                  </p>
                )}
              </div>
              <div>
                <h3 className="font-serif text-lg text-white">Quick Links</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li>
                    <Link
                      href="/services/"
                      className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/property-types/"
                      className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      Property Types
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/locations/"
                      className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      Locations
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources/"
                      className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      Resources
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg text-white">Service Areas</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {CA_CITIES_SLUGS.slice(0, 4).map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/locations/${city.slug}`}
                        className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/locations/"
                      className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      View full coverage
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg text-white">Compliance Resources</h3>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  <li>
                    <Link
                      href="https://www.irs.gov/forms-pubs/about-form-8824"
                      className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      IRS Form 8824 Instructions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.irs.gov/tax-professionals/like-kind-exchanges-under-irc-code-section-1031"
                      className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      IRS Like-Kind Exchanges Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.ftb.ca.gov/file/business/types/corporations/1031-like-kind-exchanges.html"
                      className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      California FTB 1031 Guidance
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://ttc.lacounty.gov/documentary-transfer-tax/"
                      className="hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      Los Angeles Documentary Transfer Tax
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-900/60 py-6">
              <div className="mx-auto flex flex-col gap-4 px-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
                <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
                <p>
                  Nothing on this site constitutes legal, tax, or investment advice. Engage qualified professionals before executing a 1031 exchange.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function FormField(props: {
  label: string;
  id: keyof FormState;
  type: "text" | "email" | "tel" | "date" | "textarea";
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  error?: string;
  required?: boolean;
  helper?: string;
}): JSX.Element {
  const {
    label,
    id,
    type,
    value,
    onChange,
    autoComplete,
    error,
    required,
    helper,
  } = props;
  const inputClasses =
    "mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;
  const describedBy = `${error ? errorId : ""}${helper ? ` ${helperId}` : ""}`.trim();

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-slate-200">
        {label}
        {required ? <span style={{ color: ACCENT_COLOR }}>{" "}*</span> : null}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={inputClasses}
        />
      )}
      {helper ? (
        <p id={helperId} className="mt-2 text-xs text-slate-400">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 text-xs text-amber-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function InfoBadge(): JSX.Element {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70">
      <InfoIcon />
    </div>
  );
}

function InfoIcon(): JSX.Element {
  return (
    <Info
      className="h-5 w-5"
      style={{ color: ACCENT_COLOR }}
      aria-hidden="true"
    />
  );
}

