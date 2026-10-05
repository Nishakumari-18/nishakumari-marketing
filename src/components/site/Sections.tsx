import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";

export const PREFILL_EVENT = "prefill-interest";

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2-display h2-line mt-4">{title}</h2>
    </>
  );
}

function NumberedList({ items }: { items: { title: string; text?: string; badge?: string }[] }) {
  return (
    <ol className="mt-12 border-t border-line">
      {items.map((it, i) => (
        <li
          key={it.title}
          className="group grid grid-cols-[4rem_1fr] items-baseline gap-6 border-b border-line px-2 py-7 transition-colors duration-300 hover:bg-surface md:grid-cols-[6rem_1fr]"
        >
          <span className="font-serif text-4xl text-accent md:text-5xl">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="text-2xl transition-colors group-hover:text-accent md:text-3xl">
              {it.title}
              {it.badge && <span className="eyebrow ml-3 inline-block align-middle rounded-full border border-accent px-2.5 py-0.5 !text-[0.65rem]">{it.badge}</span>}
            </h3>
            {it.text && <p className="mt-2 text-muted-foreground">{it.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Dholera() {
  return (
    <section id="dholera" className="section-y border-t border-line">
      <div className="container-x">
        <Reveal>
          <Heading eyebrow="Dholera Properties" title="Properties I sell in Dholera." />
          <p className="mt-8 max-w-2xl text-muted-foreground">
            Alongside marketing, I sell properties in Dholera. Whether you are buying to live, to run a business, or to
            invest, I can guide you through the options.
          </p>
        </Reveal>
        <NumberedList items={[{ title: "Residential" }, { title: "Commercial" }, { title: "Industrial" }, { title: "Logistics" }]} />
        <Link
          to="/"
          hash="contact"
          className="btn btn-primary mt-12"
          onClick={() => window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: "Dholera property enquiry" }))}
        >
          Enquire about Dholera properties
        </Link>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="section-y border-t border-line">
      <div className="container-x">
        <Reveal>
          <Heading eyebrow="Services" title="What I do for your business." />
        </Reveal>
        <NumberedList
          items={[
            { title: "Real Estate Lead Generation", text: "Attracting and qualifying buyers for your project.", badge: "Main focus" },
            { title: "SEO and Search Strategy", text: "Getting your project found when buyers search." },
            { title: "SEO Content Writing", text: "Blogs and pages that rank, with proper meta tags and internal linking." },
            { title: "Social Media Management", text: "Content planning, posting, and community handling." },
          ]}
        />
      </div>
    </section>
  );
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1600, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{n}+</span>;
}

export function Results() {
  const stats = [
    { n: 10, label: "Sales closed in real estate" },
    { n: 25, label: "Client visits handled" },
    { n: 50, label: "SEO articles published" },
  ];
  return (
    <section className="section-y border-t border-line bg-surface" aria-label="Results">
      <div className="container-x grid gap-12 md:grid-cols-3 md:gap-0">
        {stats.map((s, i) => (
          <div key={s.label} className={`text-center ${i ? "md:border-l md:border-line" : ""}`}>
            <p className="font-serif text-7xl text-accent md:text-8xl"><CountUp to={s.n} /></p>
            <p className="mt-3 text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Work() {
  const rows = [
    { t: "CaderaEdu SEO Content", d: "Articles on admissions, scholarships, and exam cutoffs, each with 15+ verified internal links and strict meta title and description limits." },
    { t: "Real Estate Lead Generation to Sale", d: "Omana Project, Noida. I generated leads, qualified them, arranged site visits, and followed up until the sale. Result: 10+ sales closed and 25+ client visits handled in real estate." },
    { t: "Social Media Management", d: "Content calendars, posts and reels, captions, engagement, and enquiry handling for business brands." },
  ];
  return (
    <section id="work" className="section-y border-t border-line">
      <div className="container-x">
        <Reveal>
          <Heading eyebrow="Selected Work" title="Work that shows the process." />
        </Reveal>
        <div className="mt-14 flex flex-col border-b border-line">
          {rows.map((r, i) => (
            <Reveal key={r.t} className={`border-t border-line py-12 md:w-3/4 ${i % 2 ? "md:ml-auto md:text-right" : ""}`}>
              <span className="font-serif text-6xl text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-3xl md:text-4xl">{r.t}</h3>
              <p className="mt-4 text-muted-foreground">{r.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyMe() {
  const pts = [
    ["I understand buyers.", "Real sales experience, not just theory."],
    ["One person, full marketing.", "Leads, SEO, content, and social in one place."],
    ["Clear communication.", "Regular updates and no confusing jargon."],
    ["Results you can track.", "Leads, visits, and sales, not just likes."],
  ];
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <Reveal>
          <Heading eyebrow="Why Work With Me" title="Why clients choose me." />
        </Reveal>
        <div className="mt-12 grid border-t border-line md:grid-cols-2">
          {pts.map(([t, d], i) => (
            <div key={t} className={`border-b border-line py-10 md:px-10 ${i % 2 ? "md:border-l" : "md:pl-0"}`}>
              <h3 className="text-2xl md:text-3xl">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    "Free call to understand your project and goals.",
    "A simple plan with timelines.",
    "I execute and send regular updates.",
    "We review results and improve.",
  ];
  return (
    <section className="section-y border-t border-line">
      <div className="container-x">
        <Reveal>
          <Heading eyebrow="How I Work" title="A simple, clear process." />
        </Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
          <span aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-accent md:bottom-auto md:left-0 md:right-0 md:top-5 md:h-px md:w-auto" />
          {steps.map((s, i) => (
            <li key={s} className="relative flex gap-6 md:flex-col md:gap-5">
              <span className="relative grid h-10 w-10 shrink-0 place-items-center border border-accent bg-background text-center text-base font-bold text-accent">{i + 1}</span>
              <p className="pt-1.5 md:pt-0">{s}</p>
            </li>
          ))}
        </ol>
        <p className="mt-14 text-muted-foreground">Pricing is shared after our first call.</p>
      </div>
    </section>
  );
}
