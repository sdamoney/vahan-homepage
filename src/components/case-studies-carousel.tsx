import { ArrowRight } from "lucide-react";
import caseRider from "@/assets/case-rider.png";

export function CaseStudiesCarousel() {
  return (
    <section className="container-page py-16 md:pt-[149px] md:pb-[88px]">
      <h2 className="mx-auto max-w-[980px] text-center text-[34px] leading-[1.1] font-normal tracking-[-0.02em] text-[#2B180A] sm:text-[44px] lg:text-[56px] lg:leading-[70px]">
        Stories Backed By Measurable Impact
      </h2>

      {/* Single Zomato case card */}
      <div className="mt-12 md:mt-[63px] flex w-full flex-col items-center justify-between gap-6 rounded-[24px] bg-[#FFEEE0] p-6 md:h-[449px] md:flex-row md:gap-4 md:p-8">
        {/* LEFT column */}
        <div className="flex w-full flex-col gap-6 md:w-[578px] md:gap-[26px]">
          {/* Zomato wordmark */}
          <span
            className="font-extrabold leading-none text-[#EF4F5F]"
            style={{ fontSize: "52px" }}
          >
            zomato
          </span>

          {/* Heading + button sub-group */}
          <div className="flex flex-col gap-8 md:gap-[47px]">
            <h3
              className="font-normal text-[#1E1E1E]"
              style={{
                fontSize: "36px",
                lineHeight: "49px",
                letterSpacing: "-0.011em",
                maxWidth: "558px",
              }}
            >
              A critical partner for scaling India's biggest frontline hiring.
            </h3>

            <a
              href="#"
              className="inline-flex h-[62px] w-fit items-center justify-center gap-2 rounded-[10px] px-6 py-3 font-medium text-white"
              style={{
                fontSize: "22px",
                background:
                  "radial-gradient(68.56% 189.77% at 50% 121.59%, #FF9C38 0%, #F97619 100%)",
              }}
            >
              Read the case study
              <ArrowRight className="size-5" strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* RIGHT: rider image (Frame 427324426 — tint + corners baked in) */}
        <div className="w-full overflow-hidden rounded-[19.99px] md:h-[385px] md:w-[538px]">
          <img
            src={caseRider}
            alt="Zomato delivery rider"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>

      {/* Progress: bar + 2 dots (static, matches design) */}
      <div className="mt-9 md:mt-[84px] flex items-center justify-center gap-3">
        <span className="h-[10.69px] w-[88px] rounded-full bg-[#FEC193]" />
        <span className="size-[10.69px] rounded-full bg-[#FEC193]" />
        <span className="size-[10.69px] rounded-full bg-[#FEC193]" />
      </div>
    </section>
  );
}
