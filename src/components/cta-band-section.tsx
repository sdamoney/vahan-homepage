import ctaBg from "@/assets/cta-swan-band.png";

export function CtaBandSection() {
  return (
    <section className="py-12 md:pt-[187px] md:pb-[387px]">
      <div className="container-page">
        <div
          className="relative flex flex-col items-center justify-center overflow-hidden rounded-[36px] px-6 py-16 text-center md:h-[655px] md:justify-start md:px-12 md:py-0 md:pt-[196px]"
          style={{
            backgroundImage: `url(${ctaBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#FE8302",
          }}
        >
          <h2
            className="mx-auto max-w-[860px] text-white text-[40px] [text-wrap:balance] sm:text-[56px] lg:text-[72px]"
            style={{
              fontWeight: 400,
              lineHeight: "86px",
              letterSpacing: "0",
            }}
          >
            Shape the Future of Frontline Hiring With Us.
          </h2>

          <div className="mt-[30px] md:mt-[54px]">
            <a
              href="#"
              className="inline-flex w-fit items-center justify-center bg-white transition-transform duration-200 hover:scale-105"
              style={{
                borderRadius: "16.59px",
                padding: "19.9px 39.8px",
                height: "73px",
                fontWeight: 500,
                fontSize: "29.86px",
                color: "#000000",
                boxShadow: "0px 0px 3.32px rgba(128,115,115,0.23)",
              }}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
