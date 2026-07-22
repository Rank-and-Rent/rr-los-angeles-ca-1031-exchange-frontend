import { ContactFormWrapper } from "./contact-form";

export const metadata = {
  title: "Contact Us | 1031 Exchange",
  description: "Contact our 1031 exchange team to discuss your replacement property identification needs.",
};

export default function ContactPage() {
  return (
    <main className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-16 text-center">
          <span className="mb-4 block font-serif text-xl italic text-white/60">Get In Touch</span>
          <h1 className="font-serif text-5xl font-light tracking-wide text-white md:text-6xl lg:text-7xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Ready to start your 1031 exchange? Our team specializes in connecting investors with compliant replacement properties.
          </p>
        </div>
        <ContactFormWrapper />
      </div>
    </main>
  );
}
