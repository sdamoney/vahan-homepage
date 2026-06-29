import prasanth from "@/assets/testi-prasanth.png";
import mohnish from "@/assets/testi-mohnish.png";
import saswata from "@/assets/testi-saswata.png";

export function TestimonialsCarousel() {
  return (
    <section className="container-page py-16 md:pt-[9px] md:pb-[163px]">
      <h2 className="mx-auto max-w-[960px] text-center text-[34px] leading-[1.1] font-normal tracking-[-0.02em] text-[#2B180A] sm:text-[44px] lg:text-[56px] lg:leading-[70px]">
        Hear It From The People Themselves
      </h2>

      {/* Group 1000001436 — 3 cards, center emphasized, sides @0.44 */}
      <div className="mt-12 flex flex-col items-center justify-center gap-8 md:mt-[59px] md:flex-row md:gap-[70px]">
        <img
          src={prasanth}
          alt="“Our sourcing cost reduced by 40% in the first 3 months that we worked with Vahan.” — Prasanth Chandramouli, Former Bangalore Lead, Dunzo"
          className="w-full max-w-[335px] opacity-[0.44]"
          draggable={false}
        />
        <img
          src={mohnish}
          alt="“Vahan is a critical partner for Zomato and has time and again demonstrated the ability to deliver numbers for us in times of need.” — Mohnish Rajput, Program Manager, Zomato"
          className="w-full max-w-[388px]"
          draggable={false}
        />
        <img
          src={saswata}
          alt="“Working with Vahan has been a pleasure. The team is incredibly thoughtful and responsive.” — Saswata Shankar De, CBO, SquadStack"
          className="w-full max-w-[335px] opacity-[0.44]"
          draggable={false}
        />
      </div>

      {/* progress: bar + 2 dots */}
      <div className="mt-10 flex items-center justify-center gap-2">
        <span className="h-[10.69px] w-[88px] rounded-full bg-[#FEC193]" />
        <span className="h-[10.69px] w-[10.69px] rounded-full bg-[#FEC193]/60" />
        <span className="h-[10.69px] w-[10.69px] rounded-full bg-[#FEC193]/60" />
      </div>
    </section>
  );
}
