import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Dholera, Services, Results, Work, WhyMe, Process } from "@/components/site/Sections";
import { Contact, WhatsAppButton } from "@/components/site/Contact";
import headshot from "@/assets/nisha-headshot.jpg.asset.json";

// Swap this for the full-length event photo once it is uploaded.
const HERO_PHOTO = headshot.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nisha Kumari | Real Estate Lead Generation & SEO" },
      { name: "description", content: "Freelance digital marketer for real estate brands: lead generation, SEO, SEO content and social media." },
      { property: "og:title", content: "Nisha Kumari | Real Estate Lead Generation & SEO" },
      { property: "og:description", content: "I generate qualified leads for real estate brands and turn them into sales." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="container-x pb-[72px] pt-10 md:pb-[112px] md:pt-16">
        <div className="grid items-center gap-16 md:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <p className="eyebrow">Freelance Digital Marketer &nbsp;·&nbsp; Real Estate</p>
            <h1 className="h1-display mt-6">Lead generation and SEO for real estate brands.</h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">I generate qualified leads and turn them into sales.</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/" hash="contact" className="btn btn-primary">Book a free consultation</Link>
              <Link to="/" hash="work" className="btn btn-secondary">See my work</Link>
            </div>
            <ul className="mt-12 flex flex-wrap items-center text-sm text-muted-foreground">
              {["10+ sales closed", "25+ client visits", "50+ SEO articles"].map((s, i) => (
                <li key={s} className={`py-1 pr-5 ${i ? "border-l border-line pl-5" : ""}`}>{s}</li>
              ))}
            </ul>
          </Reveal>
          <div className="relative mx-auto w-full max-w-md pr-[14px] pb-[14px]">
            <div className="absolute inset-0 left-[14px] top-[14px] border border-accent" aria-hidden />
            <img
              src={HERO_PHOTO}
              alt="Nisha Kumari, freelance digital marketer for real estate"
              className="photo-fade relative aspect-[4/5] w-full object-cover object-top"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section id="about" className="section-y border-t border-line">
        <div className="container-x grid items-start gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-24">
          <img
            src={headshot.url}
            alt="Portrait of Nisha Kumari"
            loading="lazy"
            className="aspect-square w-full max-w-sm object-cover object-center"
          />
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="h2-display h2-line mt-4">Marketing that understands the buyer.</h2>
            <p className="mt-8 max-w-xl text-muted-foreground">
              I'm Nisha Kumari, a freelance digital marketer who helps real estate businesses get more serious buyers. I
              don't only run marketing. I've worked on the sales side too, with 10+ sales closed and 25+ client visits
              handled in real estate, including the Omana Project in Noida, so I know which leads are worth chasing. I
              handle lead generation, SEO, SEO content, and social media, so you have one person managing it all.
            </p>
          </Reveal>
        </div>
      </section>

      <Dholera />
      <Services />
      <Results />
      <Work />
      <WhyMe />
      <Process />
      <Contact />
      <WhatsAppButton />
    </>
  );
}
