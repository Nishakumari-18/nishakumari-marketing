import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SHARE_IMAGE, SITE_URL } from "@/lib/site";

const TITLE = "Digital Marketing Guide for Real Estate | Nisha Kumari";
const DESC = "A plain-language map of how every digital marketing channel works for real estate, and how they fit together.";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `${SITE_URL}/guide` },
      { property: "og:image", content: SHARE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: SHARE_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/guide` }],
  }),
  component: Guide,
});

const TOPICS = [
  { id: "what-is", pill: "What Is Digital Marketing", title: "What Is Digital Marketing", body: "Digital marketing is how a business gets found, trusted, and chosen online. For a real estate brand, that means reaching buyers while they search, scroll, and compare projects." },
  { id: "field", pill: "The Whole Field", title: "The Whole Field on One Map", body: "Every channel has a job. SEO and content bring people in, social media builds trust, email and WhatsApp keep the conversation going, landing pages convert, and ads speed everything up." },
  { id: "brand", pill: "Brand vs Performance", title: "Brand-Building vs. Performance", body: "Brand-building (content, social, SEO) makes buyers remember you. Performance marketing (paid ads) delivers leads right now. Strong businesses need both: ads bring quick enquiries, and brand makes buyers trust you enough to visit." },
  { id: "content", pill: "Content", title: "Content Marketing", body: "Useful articles, guides, and videos that answer buyers' questions, such as whether a location is good for investment. Good content brings steady enquiries for months, not just for a day." },
  { id: "seo", pill: "SEO and GEO", title: "SEO and GEO", body: "SEO helps your project show up on Google when buyers search. GEO, or generative engine optimization, is the newer part: making your content clear and trustworthy enough that AI tools like ChatGPT and Gemini mention your brand in their answers." },
  { id: "social", pill: "Social Media", title: "Social Media Marketing", body: "Consistent posts, reels, and stories that show the project, the location, and real updates. It is where buyers decide whether they trust you." },
  { id: "email", pill: "Email", title: "Email Marketing", body: "Not every buyer decides in a week. Email keeps your project in front of them with updates, offers, and reminders until they are ready." },
  { id: "whatsapp", pill: "WhatsApp and Chat", title: "WhatsApp and Conversational Marketing", body: "In India, buyers reply on WhatsApp faster than anywhere else. Quick answers, brochures, and site-visit bookings in chat turn enquiries into visits." },
  { id: "websites", pill: "Websites and Landers", title: "Websites and Landing Pages", body: "Your website is where all the interest ends up. A fast, clear landing page with one strong call to action turns visitors into enquiries." },
  { id: "ads", pill: "Performance Ads", title: "Performance Marketing (Paid Ads)", body: "Google and Meta ads put your project in front of ready buyers immediately. Success comes from the right audience, a clear offer, and tracking every lead." },
  { id: "affiliate", pill: "Affiliate", title: "Affiliate Marketing", body: "Partners promote your project and earn a commission only when a lead or sale results. It widens your reach with low risk." },
  { id: "together", pill: "How It Fits Together", title: "How the Channels Feed Each Other", body: "A buyer might see a reel, search your project on Google, read a blog, and then message you on WhatsApp. Each channel supports the next, which is why a joined-up plan beats any single channel." },
  { id: "faq", pill: "FAQ", title: "FAQ", body: "" },
];

const FAQS = [
  ["How long does SEO take to show results?", "Usually a few months, and it keeps working afterwards."],
  ["Do I need ads if I already do SEO?", "Often yes. Ads give faster results while SEO builds."],
  ["Which channel is best for real estate?", "A mix of SEO, social, and WhatsApp usually works best."],
  ["How do I know if marketing is working?", "By tracking leads, site visits, and sales, not just likes."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-8 max-w-[68ch] border-t border-line">
      {FAQS.map(([q, a], i) => {
        const isOpen = open === i;
        return (
          <div key={q} className="border-b border-line">
            <h3 className="font-sans text-base">
              <button
                id={`faq-btn-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium"
              >
                {q}
                <ChevronDown size={18} className={`shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
            </h3>
            <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!isOpen} className="pb-5 text-muted-foreground">
              {a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Guide() {
  const [active, setActive] = useState(TOPICS[0]!.id);
  const [showTop, setShowTop] = useState(false);
  const pillRow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-160px 0px -55% 0px" },
    );
    TOPICS.forEach((t) => { const el = document.getElementById(t.id); if (el) io.observe(el); });
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const pill = pillRow.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const row = pillRow.current;
    if (pill && row) row.scrollTo({ left: pill.offsetLeft - row.clientWidth / 2 + pill.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <>
      <header className="container-x pb-12 pt-10 md:pt-16">
        <Reveal>
          <p className="eyebrow">Guide</p>
          <h1 className="h1-display mt-6 max-w-4xl">Digital marketing, explained for real estate.</h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">A plain-language map of how every channel works and how they fit together.</p>
        </Reveal>
        <nav aria-label="Table of Contents" className="mt-12 max-w-2xl rounded-sm border border-line bg-surface-2 p-6 md:p-8">
          <h2 className="font-serif text-2xl">Table of Contents</h2>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {TOPICS.map((t, i) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="link-slide text-sm text-muted-foreground hover:text-foreground">
                  {String(i + 1).padStart(2, "0")}&nbsp; {t.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <div className="sticky top-20 z-30 border-y border-line bg-background">
        <div ref={pillRow} className="no-scrollbar container-x flex gap-2 overflow-x-auto py-3" role="navigation" aria-label="Quick Navigate">
          {TOPICS.map((t) => (
            <a
              key={t.id}
              data-id={t.id}
              href={`#${t.id}`}
              aria-current={active === t.id ? "true" : undefined}
              className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active === t.id ? "border-accent bg-accent text-primary-foreground" : "border-line text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              {t.pill}
            </a>
          ))}
        </div>
      </div>

      <div className="container-x">
        {TOPICS.map((t) => (
          <section key={t.id} id={t.id} className="scroll-mt-40 border-b border-line py-16 md:py-20">
            <Reveal>
              <h2 className="h2-display h2-line">{t.title}</h2>
              {t.body && <p className="mt-8 max-w-[68ch] text-lg text-muted-foreground">{t.body}</p>}
            </Reveal>
            {t.id === "faq" && <Faq />}
          </section>
        ))}
      </div>

      <section className="container-x section-y text-center">
        <Reveal>
          <h2 className="h2-display">Want this working for your project? Let's talk.</h2>
          <div className="mt-10">
            <Link to="/" hash="contact" className="btn btn-primary">Book a free consultation</Link>
          </div>
        </Reveal>
      </section>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-24 right-6 z-30 grid h-11 w-11 place-items-center rounded-full border border-accent bg-background text-accent transition-opacity md:bottom-28 md:right-9 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp size={18} aria-hidden />
      </button>
    </>
  );
}
