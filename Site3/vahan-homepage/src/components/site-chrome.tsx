import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, X, ArrowRight, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import logoAsset from "@/assets/vahan-logo.svg.asset.json";

type DropdownItem = { label: string; href: string };

type NavItem =
  | { label: string; href: string; children?: never }
  | { label: string; href?: never; children: DropdownItem[] };

const NAV_ITEMS: NavItem[] = [
  {
    label: "Solution",
    children: [
      { label: "Corporates", href: "/corporates" },
      { label: "Recruitment Leaders", href: "/recruitment-leaders" },
      { label: "Job-seekers", href: "/job-seekers" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "Our Story", href: "/our-story" },
      { label: "Careers", href: "/careers" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Events", href: "/events" },
      { label: "Vahan Leaders Stories", href: "/vahan-leaders-stories" },
      { label: "Rider Hub", href: "/rider-hub" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
];

function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <a href="/" className="flex items-center gap-2">
      <img src={logoAsset.url} alt="Vahan logo" className={className} />
      <span className="text-[22px] font-semibold text-[#2A2A2A] tracking-tight leading-none">
        vahan
      </span>
    </a>
  );
}

function DesktopDropdown({
  label,
  children,
}: {
  label: string;
  children: DropdownItem[];
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 px-6 py-2.5 text-[18px] font-medium text-[#313944] hover:text-[color:var(--text-primary)] transition-colors cursor-pointer"
      >
        {label}
        <ChevronDown
          size={16}
          strokeWidth={2.25}
          className="opacity-70 group-hover:opacity-100 transition-opacity group-hover:rotate-180 duration-200"
        />
      </button>

      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(43,24,10,0.12)] border border-[color:var(--border-warm)] py-2 min-w-[220px] overflow-hidden">
          {children.map((child) => (
            <a
              key={child.label}
              href={child.href}
              className="block px-5 py-2.5 text-[14px] text-[color:var(--text-body)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-cream-soft)] transition-colors"
            >
              {child.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setMobileExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all duration-300 bg-white",
        scrolled
          ? "border-b border-[color:var(--border-warm)]"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="container-page flex items-center justify-between h-[88px]">
        <Logo />

        <nav className="hidden md:flex items-center gap-[10px]">
          {NAV_ITEMS.map((item) =>
            "children" in item && item.children ? (
              <DesktopDropdown
                key={item.label}
                label={item.label}
                children={item.children}
              />
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="px-6 py-2.5 text-[18px] font-medium text-[#313944] hover:text-[color:var(--text-primary)] transition-colors"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="btn-primary hidden sm:inline-flex items-center gap-2 text-[18px] font-medium"
          >
            Get Started
            <ArrowRight size={16} strokeWidth={2.25} />
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-[color:var(--text-primary)] hover:bg-[color:var(--surface-peach)] transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 border-t border-[color:var(--border-warm)]",
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 border-transparent",
        ].join(" ")}
      >
        <nav className="container-page py-4 flex flex-col gap-1 bg-[color:var(--bg-cream)]">
          {NAV_ITEMS.map((item) => {
            const hasChildren = "children" in item && !!item.children;
            const expanded = mobileExpanded[item.label] || false;
            return (
              <div key={item.label} className="border-b border-[color:var(--border-warm)] last:border-b-0">
                {hasChildren ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(item.label)}
                      className="flex items-center justify-between w-full py-3 px-2 text-[15px] text-[color:var(--text-body)] hover:text-[color:var(--text-primary)]"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={["opacity-60 transition-transform duration-200", expanded ? "rotate-180" : ""].join(" ")}
                      />
                    </button>
                    <div
                      className={[
                        "overflow-hidden transition-[max-height,opacity] duration-200",
                        expanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
                      ].join(" ")}
                    >
                      <div className="pb-2 pl-4 flex flex-col gap-0.5">
                        {item.children!.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 py-2 px-2 text-[14px] text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)] transition-colors"
                          >
                            <ChevronRight size={12} className="opacity-50" />
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-2 text-[15px] text-[color:var(--text-body)] hover:text-[color:var(--text-primary)]"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            );
          })}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-3 w-full items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight size={16} strokeWidth={2.25} />
          </a>
        </nav>
      </div>
    </header>
  );
}

const FOOTER_LINKS = {
  Solution: [
    { label: "Corporates", href: "/corporates" },
    { label: "Requirement Leaders", href: "/recruitment-leaders" },
    { label: "Job Seekers", href: "/job-seekers" },
  ],
  Company: [
    { label: "Our Stories", href: "/our-story" },
    { label: "Careers", href: "/careers" },
    { label: "Newsroom", href: "/newsroom" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Events", href: "/events" },
    { label: "Vahan Leader Stories", href: "/vahan-leaders-stories" },
  ],
};

const SOCIAL_ICONS = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#2B180A] text-white/70">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Left column — logo + description */}
          <div className="md:col-span-4">
            <a href="/" className="inline-flex flex-col items-start gap-1.5">
              <img src={logoAsset.url} alt="Vahan logo" className="h-[84px] w-[84px]" />
              <span className="text-[color:var(--bg-cream)] text-lg font-semibold tracking-tight leading-none">
                vahan
              </span>
            </a>
            <p className="mt-5 text-[14px] text-white/70 leading-relaxed max-w-[214px]">
              India's AI-powered workforce platform, bringing economic support unity to millions through human-centric technology and mentorship.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="text-[16px] text-white/50 mb-4">{title}</h4>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="md:col-span-2">
            <h4 className="text-[16px] text-white/50 mb-4">Contact</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-white/70">
              <li>Corporate Address</li>
              <li>Address lin1</li>
              <li>Address line 2</li>
              <li>City, State, Pincode</li>
              <li>India</li>
              <li>Contact NO: 12-12-12-12-121</li>
              <li>Email: example@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-white/70">
            Copyright © 2026 Vahan.ai, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] text-white/50 hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[12px] text-white/50 hover:text-white/80 transition-colors">
              Terms & Conditions
            </a>
            <div className="flex items-center gap-4 ml-2">
              {SOCIAL_ICONS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/50 hover:text-white/90 transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
