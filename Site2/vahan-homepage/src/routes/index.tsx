import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TabbedSection } from "@/components/tabbed-section";
import { OrangeBandSection } from "@/components/orange-band-section";
import { CaseStudiesCarousel } from "@/components/case-studies-carousel";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { PressSection } from "@/components/press-section";
import { VideoStoriesSection } from "@/components/video-stories-section";
import { CtaBandSection } from "@/components/cta-band-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vahan — AI Recruiter for India's Blue-Collar Workforce" },
      { name: "description", content: "Vahan is the AI recruiter powering hiring for India's massive blue-collar workforce." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="page-bg relative min-h-screen overflow-x-hidden">
      <SiteHeader />

      <main className="relative">
        <HeroSection />
        <FeaturesSection />

        <TabbedSection />
        <OrangeBandSection />
        <CaseStudiesCarousel />
        <TestimonialsCarousel />
        <PressSection />
        <VideoStoriesSection />
        <CtaBandSection />
      </main>

      <SiteFooter />
    </div>
  );
}

