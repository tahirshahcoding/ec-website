import { ServicesGrid } from "@/components/services/ServicesGrid";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { CTA } from "@/components/sections/CTA";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Services — EagleNest Creations",
  description:
    "Explore EagleNest's full suite of services: AI development, software engineering, web and mobile apps, branding, digital marketing, SEO, content, and cloud.",
});

export default function ServicesPage() {
  return (
    <>
      <ServicesGrid />
      <ServicesProcess />
      <CTA />
    </>
  );
}
