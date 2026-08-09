import { ContactHero } from "@/components/contact/ContactHero";
import { ContactOptions } from "@/components/contact/ContactOptions";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactOffice } from "@/components/contact/ContactOffice";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { ContactCTA } from "@/components/contact/ContactCTA";
import { ContactStickyCta } from "@/components/contact/ContactStickyCta";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Contact — EagleNest Creations",
  description:
    "Start a conversation with EagleNest Creations. Tell us about your project and get a thoughtful reply within 24 hours.",
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactOptions />
      <ContactForm />
      <ContactOffice />
      <ContactFAQ />
      <ContactCTA />
      <ContactStickyCta />
    </>
  );
}
