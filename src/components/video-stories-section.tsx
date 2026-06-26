import { useState, useEffect } from "react";
import { X } from "lucide-react";
import video1 from "@/assets/video-1-crore-income.png";
import video2 from "@/assets/video-2-revenue.png";

type Story = {
  thumb: string;
  duration: string;
  videoUrl: string;
  title: string;
};

const stories: Story[] = [
  { thumb: video1, duration: "0:58", title: "24 Saal Ki Umar Mein Crorepati Income", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { thumb: video2, duration: "1:24", title: "30 Lakh ke loss se 3 Crore Revenue tak", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

export function VideoStoriesSection() {
  const [active, setActive] = useState<Story | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section className="container-page py-16 md:pt-[140px] md:pb-[88px]">
      <h2 className="mx-auto max-w-[1050px] text-center text-[34px] leading-[1.25] font-normal tracking-[-0.02em] text-[#2B180A] sm:text-[44px] lg:text-[56px] lg:leading-[70px]">
        Building New Lives, One Story at a Time.
      </h2>

      {/* Video cards row */}
      <div className="mt-12 flex flex-col md:flex-row md:flex-nowrap gap-6 md:gap-8 overflow-x-hidden">
        {stories.map((s, i) => (
          <button
            key={i}
            onClick={() => setActive(s)}
            className="group relative block w-full md:w-[639px] md:h-[340px] aspect-video md:aspect-auto shrink-0 overflow-hidden rounded-[16px] bg-black/5 focus:outline-none focus:ring-2 focus:ring-[color:var(--orange)]"
            aria-label={`Play ${s.title}`}
          >
            {/* Thumbnail already has play button + title baked in */}
            <img
              src={s.thumb}
              alt={s.title}
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Progress bar (left-aligned) */}
      <div className="mt-11 h-[9px] w-full md:w-[1050px] rounded-full bg-[#FFF8F0]">
        <div className="h-[9px] w-1/2 md:w-[639px] rounded-full bg-[#FEA04A]" />
      </div>

      {/* Read More Stories button */}
      <div className="mt-11 flex justify-center">
        <a
          href="#"
          className="inline-flex items-center justify-center font-medium text-white"
          style={{
            height: "61px",
            padding: "16.64px 33.27px",
            borderRadius: "13.86px",
            fontSize: "24.95px",
            fontWeight: 500,
            background:
              "radial-gradient(68.56% 189.77% at 50% 121.59%, #FF9C38 0%, #F97619 100%)",
          }}
        >
          Read More Stories
        </a>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4 animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              aria-label="Close video"
            >
              <X className="size-5" />
            </button>
            <video
              src={active.videoUrl}
              poster={active.thumb}
              controls
              autoPlay
              className="aspect-video w-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
