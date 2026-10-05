import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { NAV_LINKS } from "./nav";

function NavItem({ item, className, onClick }: { item: (typeof NAV_LINKS)[number]; className: string; onClick?: () => void }) {
  if (item.to) return <Link to={item.to} className={className} onClick={onClick}>{item.label}</Link>;
  return <Link to="/" hash={item.hash ?? "top"} className={className} onClick={onClick}>{item.label}</Link>;
}

export function Wordmark() {
  return (
    <Link to="/" hash="top" className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center border border-accent font-serif text-sm text-accent">NK</span>
      <span className="font-serif text-xl tracking-wide">Nisha Kumari</span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("theme", next ? "light" : "dark");
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-background" : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Wordmark />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavItem key={l.label} item={l} className="link-slide text-sm text-muted-foreground hover:text-foreground" />
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Switch theme"
            aria-pressed={light}
            className="grid h-10 w-10 place-items-center text-accent transition-opacity hover:opacity-70"
          >
            {light ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
          </button>
          <Link to="/" hash="contact" className="btn btn-primary hidden !px-4 !py-2 sm:inline-flex">Book a call</Link>
          <button className="grid h-10 w-10 place-items-center lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-background">
          <div className="container-x flex h-20 items-center justify-between">
            <Wordmark />
            <button aria-label="Close menu" className="grid h-10 w-10 place-items-center" onClick={() => setOpen(false)} autoFocus>
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="container-x mt-10 flex flex-col gap-6" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <NavItem key={l.label} item={l} className="font-serif text-5xl hover:text-accent" onClick={() => setOpen(false)} />
            ))}
            <Link to="/" hash="contact" onClick={() => setOpen(false)} className="btn btn-primary mt-6 self-start">Book a call</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
