import { useState } from "react";
import { ArrowRight } from "lucide-react";
import tabbedMock from "@/assets/tabbed-mock.png";

const TABS = [
  { id: "vahan-ai", label: "Vahan.ai" },
  { id: "vahan-partners", label: "Vahan Partners" },
  { id: "vahan-jobs", label: "Vahan Jobs" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const TAB_CONTENT: Record<
  TabId,
  {
    eyebrow: string;
    heading: string;
    paragraph: string;
    stat: string;
    cta: string;
  }
> = {
  "vahan-ai": {
    eyebrow: "Vahan.ai",
    heading: "AI-Powered Hiring At Scale",
    paragraph:
      "Hire efficiently and quickly at scale using AI sourcing across largest worker network",
    stat: "4 Crore+ worker network",
    cta: "Explore Vahan.ai →",
  },
  "vahan-partners": {
    eyebrow: "Vahan Partners",
    heading: "Grow your business with India's biggest demand pool.",
    paragraph:
      "Steady hiring demand from top employers, AI tools that make every recruiter more productive, and fast, reliable payouts.",
    stat: "10-Day payment cycle",
    cta: "Explore Vahan Partners →",
  },
  "vahan-jobs": {
    eyebrow: "Vahan Jobs",
    heading: "Find real work, in your language.",
    paragraph:
      "Real jobs from India's top employers. Apply by chat or voice, in the language you speak, any time of day.",
    stat: "10 Lakh+ workers placed",
    cta: "Explore Vahan Jobs →",
  },
};

export function TabbedSection() {
  const [activeTab, setActiveTab] = useState<TabId>("vahan-ai");
  const content = TAB_CONTENT[activeTab];

  return (
    <section className="container-page py-16 md:pt-[158px] md:pb-[88px]">
      {/* Heading — box 801, top 2414 */}
      <h2 className="mx-auto max-w-[860px] text-center text-[34px] leading-[1.1] font-normal tracking-[-0.02em] text-[#2B180A] [text-wrap:balance] sm:text-[44px] lg:text-[56px] lg:leading-[70px]">
        One Partner For The Three Sides of India&apos;s Frontline Economy
      </h2>

      {/* Tab box: 1200 x 550 (tab bar 54 + panel 448, gap 60 below heading) */}
      <div className="mt-10 md:mt-[60px]">
        {/* Tab bar — full 1200 width, height 54 */}
        <div className="flex w-full">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "flex-1 pb-4 text-[18px] sm:text-[20px] lg:text-[24px] text-center transition-colors duration-200 relative border-b-2",
                  isActive
                    ? "font-semibold text-[#2B180A] border-[#F97316]"
                    : "font-normal text-[rgba(43,24,10,0.7)] border-[rgba(43,24,10,0.34)] hover:text-[#2B180A]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel — 1200 x 448, left card 596 + gap 66 + right 527 */}
        <div
          key={activeTab}
          className="mt-10 md:mt-[48px] grid grid-cols-1 gap-10 md:grid-cols-[596fr_527fr] md:items-center md:gap-[66px] animate-[fadeIn_0.4s_ease-out]"
        >
          {/* Left: peach card 596x448, radius 24, padding 24 */}
          <div className="order-2 md:order-1">
            <div className="flex items-center justify-center rounded-[24px] bg-[#FFEEE0] p-6 md:h-[448px] md:p-6">
              <img
                src={tabbedMock}
                alt="Vahan team dashboard preview"
                className="mx-auto h-auto max-h-full w-full max-w-[500px]"
              />
            </div>
          </div>

          {/* Right: text content, 527 wide */}
          <div className="order-1 flex flex-col md:order-2 md:max-w-[527px]">
            {/* Vahan.ai — Inter Display 500, 38px, lh 122%, -1.9% */}
            <h3 className="text-[30px] font-medium leading-[1.22] tracking-[-0.019em] text-[#2B180A] sm:text-[38px]">
              {content.eyebrow}
            </h3>
            {/* AI-Powered Hiring At Scale — Inter 500, 24px, 150%, -1.1% */}
            <p className="mt-6 text-[20px] font-medium leading-[1.5] tracking-[-0.011em] text-[#2B180A] sm:text-[24px]">
              {content.heading}
            </p>
            {/* paragraph — Inter 400, 24px, 150%, -1.1%, max 497 */}
            <p className="mt-2 max-w-[497px] text-[18px] font-normal leading-[1.5] tracking-[-0.011em] text-[rgba(43,24,10,0.8)] sm:text-[24px]">
              {content.paragraph}
            </p>
            {/* stat — Inter Display 600, 24px, 150%, -1.1% */}
            <p className="mt-7 text-[20px] font-semibold leading-[1.5] tracking-[-0.011em] text-[rgba(43,24,10,0.8)] sm:text-[24px]">
              {content.stat}
            </p>
            {/* button — 221x56, padding 12/24, gap 8, radius 10, text 20/500 */}
            <button
              type="button"
              className="btn-primary mt-6 h-[56px] w-fit gap-2 rounded-[10px] px-6 text-[20px] font-medium tracking-[-0.019em]"
            >
              {content.cta.replace(" →", "")}
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
