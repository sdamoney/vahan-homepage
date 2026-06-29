import { useState } from "react";
import {
  LineChart,
  Zap,
  Heart,
  Users,
  PhoneCall,
} from "lucide-react";
import featureCard from "@/assets/feature-card.png";

type Feature = {
  id: string;
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number; color?: string }>;
};

const FEATURES: Feature[] = [
  {
    id: "sourcing",
    title: "Intelligent Sourcing",
    desc: "Find high-intent candidates across every channel and network.",
    Icon: LineChart,
  },
  {
    id: "screening",
    title: "Smart Screening",
    desc: "Verify skills, experience, and reliability with AI assessments.",
    Icon: Zap,
  },
  {
    id: "matching",
    title: "Best-Fit Matching",
    desc: "Match the right worker to the right job, using data and context.",
    Icon: Heart,
  },
  {
    id: "retention",
    title: "Retention Intelligence",
    desc: "Predict risks, take action early and improve retention.",
    Icon: Users,
  },
  {
    id: "engagement",
    title: "Engagement Automation",
    desc: "Automate outreach, follow-ups, and onboarding using our Voice AI.",
    Icon: PhoneCall,
  },
];

const STATS = [
  { value: "76%", label: "Higher recruiter productivity" },
  { value: "100,000+", label: "Calls a day" },
  { value: "40,000", label: "Hires a month" },
];

export function FeaturesSection() {
  const [openId, setOpenId] = useState<string>(FEATURES[0].id);

  return (
    <section className="container-page relative py-16 md:pt-[124px] md:pb-[88px]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(254,193,147,0.35), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[859px] text-center">
        <h2 className="text-[34px] font-normal leading-[1.25] tracking-[-0.02em] text-[#2B180A] sm:text-[44px] lg:text-[56px] lg:leading-[70px]">
          Everything Blue-Collar Hiring Needs, In One AI Recruiter.
        </h2>
      </div>

      <div className="relative mt-[54px] grid gap-12 md:grid-cols-[583fr_519fr] md:items-start md:gap-16 lg:gap-[98px]">
        {/* Left: Accordion (Tabs Wrapper — 583 x 715.4) */}
        <div className="flex w-full flex-col md:h-[715.4px] md:w-[583px]">
          {FEATURES.map((f) => {
            const isOpen = f.id === openId;
            const Icon = f.Icon;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setOpenId(f.id)}
                className={`flex w-full flex-col justify-center rounded-[24px] px-5 py-6 text-left transition-colors md:px-6 md:py-0 ${
                  isOpen
                    ? "bg-white shadow-[0_18px_40px_rgba(43,24,10,0.08)] md:min-h-[203.4px]"
                    : "bg-transparent hover:bg-white/40 md:min-h-[128px]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] transition-colors"
                    style={
                      isOpen
                        ? {
                            background:
                              "radial-gradient(68.56% 189.77% at 50% 121.59%, #FF9C38 0%, #F97619 100%)",
                          }
                        : { backgroundColor: "#EFE7DD" }
                    }
                  >
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={2}
                      color={isOpen ? "#FFFFFF" : "#6C503C"}
                    />
                  </div>
                  <div
                    className="flex-1 text-[24px] font-normal capitalize leading-tight transition-colors sm:text-[28px] lg:text-[32px]"
                    style={{ color: isOpen ? "#2B180A" : "#94877C" }}
                  >
                    {f.title}
                  </div>
                </div>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className="pl-[64px] pr-2 text-[20px] font-normal leading-relaxed"
                      style={{ color: "rgba(0,0,0,0.8)" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Peach card with product screenshot */}
        <div className="relative flex items-center justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[480px] w-[480px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(254,193,147,0.45), transparent 70%)",
            }}
          />
          <img
            src={featureCard}
            alt="Vahan AI recruiter candidate card"
            className="relative w-full max-w-[519px]"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="relative mt-[186px] flex flex-col items-center">
        <div className="grid w-full max-w-[1100px] grid-cols-1 gap-10 text-center sm:grid-cols-3 sm:gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="text-[44px] font-normal sm:text-[56px] lg:text-[68px]"
                style={{
                  lineHeight: "84%",
                  letterSpacing: "-0.019em",
                  color: "#2B180A",
                }}
              >
                {s.value}
              </div>
              <div
                className="mt-px text-[18px] font-normal leading-[1.5] sm:text-[24px]"
                style={{ letterSpacing: "-0.019em", color: "#2B180A" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
