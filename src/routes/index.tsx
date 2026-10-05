import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Dholera, Services, Results, Work, WhyMe, Process } from "@/components/site/Sections";
import { Contact, WhatsAppButton } from "@/components/site/Contact";
import headshot from "@/assets/nisha-headshot.jpg.asset.json";
import portrait from "@/assets/nisha-portrait.webp.asset.json";
import { SHARE_IMAGE, SITE_URL } from "@/lib/site";

const HERO_PHOTO = portrait.url;
const TITLE = "Nisha Kumari | Freelance Digital Marketer for Real Estate";
const DESC = "Freelance digital marketer helping real estate brands with lead generation, SEO, content, and social media. Based in Noida, India.";
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", name: "Nisha Kumari", jobTitle: "Freelance Digital Marketer", telephone: "+919031503628", email: "nishkumari18jsr@gmail.com", url: SITE_URL, image: SHARE_IMAGE, sameAs: ["https://www.linkedin.com/in/nishakumari42/"] },
    { "@type": "ProfessionalService", name: "Nisha Kumari Digital Marketing", telephone: "+919031503628", url: SITE_URL, image: SHARE_IMAGE, areaServed: "IN", address: { "@type": "PostalAddress", addressLocality: "Noida", addressCountry: "IN" }, sameAs: ["https://www.linkedin.com/in/nishakumari42/"] },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: SHARE_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: SHARE_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
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
              alt="Nisha Kumari in a white blazer, freelance digital marketer for real estate"
              width={900}
              height={900}
              loading="eager"
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
            alt="Formal portrait of Nisha Kumari"
            loading="lazy"
            width={400}
            height={400}
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
