import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { EagleAIPreview } from "@/components/sections/EagleAIPreview";
import { CTA } from "@/components/sections/CTA";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "EagleNest Creations — We Code. We Create. We Elevate.",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Stats />
      <About />
      <Process />
      <Portfolio />
      <Testimonials />
      <EagleAIPreview />
      <CTA />
    </>
  );
}
