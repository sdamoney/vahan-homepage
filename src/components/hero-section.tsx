import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import logoStrip from "@/assets/logo-strip.png.asset.json";
import ellipse13 from "@/assets/ellipse-13.png";
import ellipse14 from "@/assets/ellipse-14.png";
import waveVector from "@/assets/hero-wave-vector.png";

export function HeroSection() {
  const [phoneValue, setPhoneValue] = useState("");

  return (
    <section className="container-page relative pt-12 pb-10 md:pt-[139px] md:pb-12 bg-transparent">
      {/* Hero background: ellipse glows + wave vector, full-bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[760px] w-screen -translate-x-1/2"
      >
        {/* Ellipse 13 — left corner glow */}
        <img
          src={ellipse13}
          alt=""
          className="absolute -left-[600px] -top-[680px] w-[1200px] max-w-none select-none opacity-50"
        />
        {/* Ellipse 14 — right corner glow */}
        <img
          src={ellipse14}
          alt=""
          className="absolute -right-[600px] -top-[680px] w-[1200px] max-w-none select-none opacity-50"
        />
        {/* Wave vector — on top of the ellipses, bleeding in from both sides,
            cleared in the middle behind the text */}
        <img
          src={waveVector}
          alt=""
          className="absolute left-1/2 top-[150px] z-[1] w-[2200px] max-w-none -translate-x-1/2 select-none opacity-90"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, #000 0%, #000 16%, transparent 34%, transparent 66%, #000 84%, #000 100%)",
            maskImage:
              "linear-gradient(90deg, #000 0%, #000 16%, transparent 34%, transparent 66%, #000 84%, #000 100%)",
          }}
        />
      </div>
      <div
        className="relative z-10 mx-auto max-w-[1160px] text-center"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <h1
          className="mx-auto max-w-[1122px] text-[2.4rem] leading-[1.18] sm:text-[3.4rem] lg:text-[4.2rem] xl:text-[78px] xl:leading-[94px]"
          style={{ fontWeight: 400, letterSpacing: "-0.02em", color: "#2B180A" }}
        >
          <span className="block">AI Recruiter for India&apos;s Massive</span>
          <span className="block">Blue Collar Workforce</span>
        </h1>

        <p
          className="mx-auto mt-[23px] max-w-[815px] text-[18px] leading-[1.5] sm:text-[21px] md:text-[24px]"
          style={{ letterSpacing: "-0.019em", color: "#000000" }}
        >
          Our multilingual voice AI makes 100,000+ calls a day, so you hire at
          high volume without losing quality.
        </p>

        {/* Input + Get Started button (separate 12px-radius boxes) */}
        <div className="mx-auto mt-[34px] flex w-full max-w-[420px] items-center justify-center gap-2.5 md:w-fit md:max-w-none md:gap-[9px]">
          <div className="flex h-[58px] flex-1 items-center rounded-[12px] bg-white pl-4 pr-2 shadow-[0_2px_8px_rgba(43,24,10,0.06)] md:w-[366px] md:flex-none">
            <span
              className="flex h-[18px] w-[26px] shrink-0 flex-col overflow-hidden rounded-[3px]"
              aria-hidden
            >
              <span className="h-1/3 w-full bg-[#E97403]" />
              <span className="relative h-1/3 w-full bg-[#F4F5F4]">
                <span className="absolute left-1/2 top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#07277E]" />
              </span>
              <span className="h-1/3 w-full bg-[#258C05]" />
            </span>
            <ChevronDown className="ml-1 h-4 w-4 shrink-0 text-[#B8B8B8]" />
            <span className="mx-3 h-6 w-px shrink-0 bg-[#E5E5E5]" />
            <input
              type="tel"
              value={phoneValue}
              onChange={(e) => setPhoneValue(e.target.value)}
              placeholder="Your mobile number"
              className="min-w-0 flex-1 bg-transparent text-[18px] tracking-[-0.04em] text-[#2B180A] placeholder:text-[#B8B8B8] focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="flex h-[58px] shrink-0 items-center justify-center gap-2 rounded-[12px] px-5 text-[20px] font-medium text-white shadow-[0_0_3px_rgba(128,115,115,0.23)] transition-transform hover:-translate-y-px md:w-[192.64px] md:gap-[8.91px] md:px-[26.73px]"
            style={{
              background:
                "radial-gradient(68.56% 189.77% at 50% 121.59%, #FF9C38 0%, #F97619 100%)",
            }}
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-[10px] text-[16px] leading-[1.5] sm:text-[21px]" style={{ letterSpacing: "-0.022em", color: "#000000" }}>
          Enter your number and hear the <span className="font-bold">AI recruiter</span> live.
        </p>
      </div>

      {/* Trusted by */}
      <div className="relative z-10 mt-14 md:mt-[139px]">
        <img
          src={logoStrip.url}
          alt="Trusted by Zepto, Flipkart, Rapido, Amazon, Blinkit, Zomato, Swiggy, Uber"
          className="mx-auto block h-auto w-full max-w-[1200px]"
          style={{
            filter: "brightness(0.55) sepia(0.35) saturate(1.3) hue-rotate(-8deg)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 12.5%, #000 88%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 12.5%, #000 88%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
