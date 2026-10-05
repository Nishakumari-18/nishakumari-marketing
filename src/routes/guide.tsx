import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SHARE_IMAGE, SITE_URL } from "@/lib/site";

const TITLE = "How I Generate Real Estate Leads | Nisha Kumari";
const DESC = "How I generate leads for real estate brands, channel by channel, and how each one brings you enquiries.";

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
  { id: "what-i-do", pill: "What I Do", title: "What I Do", body: "I help real estate brands get more enquiries from serious buyers and turn those enquiries into site visits and sales. Lead generation is my main focus. Everything else on this page, from SEO to social media, is a way to bring you better leads." },
  { id: "system", pill: "My System", title: "My Lead Generation System", body: "" },
  { id: "build-buy", pill: "Build and Buy", title: "Build and Buy: Two Ways to Get Leads", body: "There are two ways to get leads. Building means content, SEO, and social media. It takes time but keeps working. Buying means paid ads. It brings leads quickly, for as long as you pay. Most projects do best with both: ads for quick enquiries now, and organic work for steady leads later." },
  { id: "content", pill: "Content", title: "Content Marketing", body: "I write articles and pages that answer what buyers actually ask, such as whether a location is good for investment. Each piece brings buyers to your website and gives them a reason to contact you. I have published 50+ SEO articles with proper meta tags and internal links." },
  { id: "seo", pill: "SEO and GEO", title: "SEO and GEO", body: "SEO helps your project appear on Google when buyers search. GEO makes your content clear enough that AI tools like ChatGPT and Gemini can mention your brand when buyers ask them. Together they bring buyers who are already looking." },
  { id: "social", pill: "Social Media", title: "Social Media Marketing", body: "I plan and manage posts, reels, and stories that show your project, its location, and real updates. Buyers check social media before they enquire, so a steady presence builds trust and brings enquiries." },
  { id: "email", pill: "Email", title: "Email Marketing", body: "Many buyers need weeks to decide. I set up simple email updates so your project stays in front of them until they are ready to visit." },
  { id: "whatsapp", pill: "WhatsApp", title: "WhatsApp and Conversational Marketing", body: "Buyers reply fastest on WhatsApp. I use it to answer questions quickly, share brochures, and book site visits, so enquiries turn into visits instead of going cold." },
  { id: "landing-pages", pill: "Landing Pages", title: "Websites and Landing Pages", body: "A landing page has one job: turn a visitor into an enquiry. I make sure the message is clear, the form is simple, and the next step is obvious." },
  { id: "ads", pill: "Paid Ads", title: "Performance Marketing (Paid Ads)", body: "Google and Meta ads show your project to buyers right now. I help with choosing the right audience, a clear offer, and tracking every lead so you know what is working." },
  { id: "affiliate", pill: "Affiliate", title: "Affiliate Marketing", body: "Channel partners promote your project and earn only when a lead or sale happens. It widens your reach with little risk." },
  { id: "together", pill: "Together", title: "How the Channels Work Together", body: "A buyer may see a reel, search your project on Google, read an article, and then message you on WhatsApp. Each channel feeds the next, which is why I plan them together instead of separately." },
  { id: "expect", pill: "What to Expect", title: "What You Can Expect From Me", body: "A free call to understand your project. A simple plan with timelines. Regular updates in plain language. Reports on leads, site visits, and sales, not just likes. Pricing is shared after our first call." },
  { id: "faq", pill: "FAQ", title: "Frequently Asked Questions", body: "" },
];

const STEPS = [
  ["Attract", "get the right buyers to notice your project."],
  ["Capture", "collect their details through forms, calls, and WhatsApp."],
  ["Qualify", "separate serious buyers from casual browsers."],
  ["Follow up", "stay in touch until they are ready for a site visit."],
  ["Convert", "support the process until the sale."],
];

function Steps() {
  return (
    <>
      <ol className="relative mt-10 grid gap-8 md:grid-cols-5 md:gap-6">
        <span aria-hidden className="absolute left-5 top-2 bottom-2 w-px bg-accent/60 md:left-0 md:right-0 md:top-5 md:bottom-auto md:h-px md:w-auto" />
        {STEPS.map(([t, d], i) => (
          <li key={t} className="relative pl-14 md:pl-0 md:pt-14">
            <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-accent bg-background font-serif text-lg text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-2xl">{t}</h3>
            <p className="mt-1 text-muted-foreground">{d.charAt(0).toUpperCase() + d.slice(1)}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-[68ch] text-lg text-muted-foreground">I have worked on the sales side of real estate, so I build this system around what actually closes deals.</p>
    </>
  );
}

const FAQS = [
  ["What does lead generation mean?", "Getting people who are interested in your property to contact you, so your sales team talks to real buyers."],
  ["How is a lead different from a sale?", "A lead is an interested buyer. A sale comes after follow-up, site visits, and trust. I help with both parts."],
  ["How long until I see leads?", "Ads can bring enquiries within days. SEO and content usually take a few months and keep working afterwards."],
  ["Which channel is best for real estate?", "Usually a mix of SEO, social, WhatsApp, and ads. I suggest the mix after learning about your project."],
  ["How do I know it is working?", "I report leads, site visits, and sales, not just likes."],
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
