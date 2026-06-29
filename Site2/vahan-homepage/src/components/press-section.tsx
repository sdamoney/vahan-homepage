import openaiAsset from "@/assets/press-1-openai.png";
import vahanAsset from "@/assets/press-2-vahan.png";
import teamAsset from "@/assets/press-3-persol.png";
import bandBg from "@/assets/livelihoods-band-9.png";

type Article = {
  image: string;
  headline: string;
  source: string;
  date: string;
  href?: string;
};

const articles: Article[] = [
  {
    image: openaiAsset,
    headline: "OpenAI backs Vahan to automate Blue Collar Hiring with AI",
    source: "Economic Times",
    date: "May 2025",
    href: "#",
  },
  {
    image: vahanAsset,
    headline: "Vahan.ai expands operations into textile and electronic sectors",
    source: "Economic Times",
    date: "May 2025",
    href: "#",
  },
  {
    image: teamAsset,
    headline: "Vahan.ai secures investment from Japan's Persol Group",
    source: "Economic Times",
    date: "May 2025",
    href: "#",
  },
];

export function PressSection() {
  return (
    <section className="container-page py-16 md:pt-0 md:pb-[88px] md:mt-[-23px]">
      <h2 className="mx-auto max-w-4xl text-center text-[34px] sm:text-[44px] lg:text-[56px] font-normal leading-[1.05] tracking-[-0.02em] text-[#2B180A]">
        Making Headlines Across India.
      </h2>

      {/* Orange band panel holding the three press cards */}
      <div
        className="relative mt-10 w-full overflow-hidden rounded-[24px] bg-cover bg-center px-6 py-10 md:mt-16 md:h-[540px] md:px-0 md:py-0"
        style={{ backgroundImage: `url(${bandBg})` }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-[26px]">
          {articles.map((a, i) => (
            <a
              key={i}
              href={a.href ?? "#"}
              className="group flex w-full max-w-[351.79px] flex-col rounded-[9.73px] bg-[#FFEEE0] p-[19.41px] md:w-[351.79px] md:h-[406.19px]"
              style={{ gap: "26.76px" }}
            >
              <div className="overflow-hidden rounded-[10.88px] md:w-[312.96px] md:h-[262.75px]">
                <img
                  src={a.image}
                  alt={a.headline}
                  className="aspect-[312.96/262.75] size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col" style={{ gap: "12.98px" }}>
                <h3
                  className="font-medium text-[#2B180A]"
                  style={{
                    fontSize: "19.46px",
                    lineHeight: "24px",
                    letterSpacing: "-0.019em",
                  }}
                >
                  {a.headline}
                </h3>
                <div
                  className="font-normal text-[#2B180A]"
                  style={{ fontSize: "14.6px", lineHeight: "18px" }}
                >
                  {a.date} <span className="mx-1.5">|</span> {a.source}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
