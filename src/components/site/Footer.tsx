import { Link } from "@tanstack/react-router";
import { CONTACT, NAV_LINKS } from "./nav";
import { Wordmark } from "./Navbar";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="container-x section-y grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-xs text-muted-foreground">Freelance digital marketing for real estate brands.</p>
        </div>
        <nav className="flex flex-col gap-3 text-sm" aria-label="Footer">
          <span className="eyebrow mb-2">Pages</span>
          {NAV_LINKS.map((l) =>
            l.to ? (
              <Link key={l.label} to={l.to} className="link-slide self-start">{l.label}</Link>
            ) : (
              <Link key={l.label} to="/" hash={l.hash} className="link-slide self-start">{l.label}</Link>
            ),
          )}
        </nav>
        <div className="flex flex-col gap-3 text-sm">
          <span className="eyebrow mb-2">Contact</span>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="link-slide self-start">{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} className="link-slide self-start">{CONTACT.email}</a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="link-slide self-start">LinkedIn</a>
        </div>
      </div>
      <div className="container-x border-t border-line py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nisha Kumari. All rights reserved.
      </div>
    </footer>
  );
}
