import { ArrowRight } from "lucide-react";
import bandBg from "@/assets/livelihoods-band-9.png";
import iconWorker from "@/assets/pl-icon-worker.png";
import iconMap from "@/assets/pl-icon-map.png";
import iconRider from "@/assets/pl-icon-rider.png";

type Stat = {
  value: string;
  label: string;
  desc: string;
  descW: string;
  glow?: boolean;
  icon: string;
};

const stats: Stat[] = [
  {
    value: "10 Lakh+",
    label: "workers placed",
    desc: "Real jobs filled across India's frontline, from delivery to logistics to retail.",
    descW: "214px",
    icon: iconWorker,
  },
  {
    value: "900+",
    label: "cities",
    desc: "Sourcing talent from every corner of India, wherever your hiring is.",
    descW: "183.12px",
    glow: true,
    icon: iconMap,
  },
  {
    value: "4 Crore+",
    label: "workers in our network",
    desc: "India's largest pool of verified frontline talent, ready to be matched to your roles.",
    descW: "234.14px",
    icon: iconRider,
  },
];

export function OrangeBandSection() {
  return (
    <section className="pt-16 pb-8 md:pt-[64px] md:pb-[40px]">
      <div className="container-page mb-10 text-center md:mb-[60px]">
        <h2
          className="text-[34px] leading-tight text-[color:var(--text-primary)] sm:text-[44px] lg:text-[56px] lg:leading-[70px]"
          style={{ fontWeight: 400, letterSpacing: "-0.02em" }}
        >
          Powering Livelihoods Across India
        </h2>
      </div>

      <div className="container-page">
        {/* Band "3 1" — 1200 x 617.07, bg 9.png, radius 24 */}
        <div
          className="relative flex flex-col items-center overflow-hidden rounded-[24px] bg-[#FF7E1D] px-6 py-12 md:h-[617.07px] md:px-0 md:py-0 md:pt-[76px]"
          style={{
            backgroundImage: `url(${bandBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Cards — 337.44 x 374.44, gap 40.64, top 76 */}
          <div className="flex w-full flex-col items-center justify-center gap-6 md:w-auto md:flex-row md:items-start md:gap-[40.64px]">
            {stats.map((s) => (
              <div
                key={s.label}
                className="relative flex w-full max-w-[337.44px] flex-col items-center justify-center gap-5 overflow-hidden rounded-[25.51px] bg-[rgba(0,0,0,0.4)] p-[21.865px] text-center md:h-[374.44px] md:w-[337.44px] md:gap-[19.13px]"
              >
                {s.glow && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-[28%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                    style={{ background: "radial-gradient(circle, rgba(37,140,5,0.55) 0%, rgba(37,140,5,0) 70%)" }}
                  />
                )}
                <div className="relative flex h-[92px] w-[92px] items-center justify-center">
                  <img src={s.icon} alt="" className="max-h-[92px] w-auto object-contain" />
                </div>
                {/* group: number+label then desc, gap 21.87 */}
                <div className="relative flex w-[234.14px] flex-col items-center gap-[21.87px]">
                  <div className="flex w-full flex-col items-center">
                    <div
                      className="text-center text-white"
                      style={{ fontWeight: 400, fontSize: "48px", lineHeight: "58px", letterSpacing: "-0.011em" }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-center text-[rgba(255,255,255,0.9)]"
                      style={{ fontWeight: 400, fontSize: "20.04px", lineHeight: "22px", letterSpacing: "-0.583px" }}
                    >
                      {s.label}
                    </div>
                  </div>
                  <p
                    className="text-center text-[rgba(255,255,255,0.9)]"
                    style={{ fontWeight: 400, fontSize: "16.4px", lineHeight: "22px", letterSpacing: "-0.583px", width: s.descW, maxWidth: "100%" }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Get Started — white, 247 x 62.59, radius 11.18, top 3953.71 (gap 47 below cards) */}
          <div className="mt-10 md:mt-[47.27px]">
            <button
              className="inline-flex items-center justify-center gap-[8.94px] rounded-[11.18px] bg-white text-black transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                width: "247px",
                height: "62.59px",
                padding: "13.41px 26.82px",
                boxShadow: "0px 0px 2.235px rgba(128,115,115,0.23)",
                fontWeight: 500,
                fontSize: "22.35px",
                lineHeight: "27px",
                letterSpacing: "-0.019em",
              }}
            >
              Get Started
              <ArrowRight style={{ width: "22.35px", height: "22.35px" }} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
