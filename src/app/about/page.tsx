import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutWhy } from "@/components/about/AboutWhy";
import { AboutTeam } from "@/components/about/AboutTeam";
import { CTA } from "@/components/sections/CTA";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "About — EagleNest Creations",
  description:
    "Meet EagleNest Creations — a technology-driven digital studio in Swat, Pakistan, combining AI, software, design, and marketing under one roof.",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutWhy />
      <AboutTeam />
      <CTA
        eyebrow="Let's build"
        title={
          <>
            Ready to Build Something
            <br />
            <span className="bg-[linear-gradient(100deg,#5B5FFF,#8B5CF6,#EC4899)] bg-clip-text text-transparent">
              Exceptional?
            </span>
          </>
        }
        description="Bring your idea to EagleNest. We'll scope it, plan it, and ship it — together."
        primaryLabel="Schedule a Strategy Call"
        secondaryLabel="Explore Our Work"
      />
    </>
  );
}
